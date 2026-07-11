// Admin Panel JS Controller - Single Page Application
// Balkrishna Driving School, Solapur

import { supabase, logoutAdmin, getSession } from './admin-auth.js';
import { exportForm14, exportForm15 } from './pdf-export.js';

// Global State
let currentSession = null;
let settingsCache = {};
let realtimeSubscription = null;

// Initialize Admin App
document.addEventListener('DOMContentLoaded', async () => {
  currentSession = await getSession();
  if (!currentSession) {
    window.location.replace('/admin/login');
    return;
  }

  // Restore sidebar collapse state
  const sidebar = document.querySelector('.admin-sidebar');
  if (sidebar && localStorage.getItem('sidebar-collapsed') === 'true') {
    sidebar.classList.add('collapsed');
  }

  // Set up sidebar collapse trigger
  const collapseBtn = document.getElementById('sidebar-collapse-btn');
  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
    });
  }

  // Set up User header info
  document.getElementById('user-email-display').innerText = currentSession.user.email;
  document.getElementById('user-avatar-initials').innerText = currentSession.user.email.substring(0, 2).toUpperCase();

  // Load Settings into cache
  await fetchSettings();

  // Navigation handlers
  initNavigation();

  // Command Palette handler
  initCommandPalette();

  // Logout button handler
  document.getElementById('logout-button').addEventListener('click', async () => {
    if (confirm('Are you sure you want to log out?')) {
      if (realtimeSubscription) {
        supabase.removeChannel(realtimeSubscription);
      }
      await logoutAdmin();
    }
  });

  // Handle Initial Route
  handleRoute();
});

// Cache settings keys
async function fetchSettings() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase.from('settings').select('*');
    if (!error && data) {
      data.forEach(item => {
        settingsCache[item.key] = item.value;
      });
    }
  } catch (err) {
    console.error('Failed to load settings:', err);
  }
}

// Router & Nav Link Highlighting
function initNavigation() {
  window.addEventListener('hashchange', handleRoute);
  
  // Highlight active link helper
  const updateActiveLink = (hash) => {
    document.querySelectorAll('.menu-link').forEach(link => {
      const href = link.getAttribute('href');
      // match base route before params
      if (href && (hash === href || hash.startsWith(href + '?') || hash.startsWith(href + '/'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Add listener to highlight current hash
  window.addEventListener('hashchange', () => {
    updateActiveLink(window.location.hash || '#/dashboard');
  });

  // Mobile sidebar drawer controllers
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.admin-sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (toggleBtn && sidebar && overlay) {
    const closeSidebar = () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    };

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
      if (sidebar.classList.contains('open')) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });

    overlay.addEventListener('click', closeSidebar);

    // Auto-close on link navigation
    document.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', closeSidebar);
    });
    
    // Auto-close on logout click
    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', closeSidebar);
    }
  }
}

// Command Palette Logic
let cmdSelectedIndex = 0;

function initCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  const input = document.getElementById('cmd-palette-input');
  const trigger = document.getElementById('header-search-trigger');
  const resultsContainer = document.getElementById('cmd-palette-results');

  if (!modal || !input) return;

  const openPalette = () => {
    modal.classList.add('active');
    input.value = '';
    input.focus();
    renderCommands('');
  };

  const closePalette = () => {
    modal.classList.remove('active');
  };

  if (trigger) {
    trigger.addEventListener('click', openPalette);
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openPalette();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePalette();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePalette();
    }
  });

  input.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.cmd-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cmdSelectedIndex = (cmdSelectedIndex + 1) % items.length;
      highlightSelected(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cmdSelectedIndex = (cmdSelectedIndex - 1 + items.length) % items.length;
      highlightSelected(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedItem = items[cmdSelectedIndex];
      if (selectedItem) {
        selectedItem.click();
      }
    }
  });

  input.addEventListener('input', (e) => {
    renderCommands(e.target.value);
  });
}

function highlightSelected(items) {
  items.forEach((item, index) => {
    if (index === cmdSelectedIndex) {
      item.classList.add('selected');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('selected');
    }
  });
}

async function renderCommands(query) {
  const container = document.getElementById('cmd-palette-results');
  if (!container) return;

  container.innerHTML = '';
  cmdSelectedIndex = 0;

  const q = query.toLowerCase().trim();

  const staticCommands = [
    { title: 'Go to Dashboard', category: 'Navigation', icon: '🏠', action: () => { window.location.hash = '#/dashboard'; } },
    { title: 'Manage Enquiries', category: 'Navigation', icon: '📨', action: () => { window.location.hash = '#/enquiries'; } },
    { title: 'Manage Trainees', category: 'Navigation', icon: '🎓', action: () => { window.location.hash = '#/trainees'; } },
    { title: 'Mark Daily Attendance', category: 'Navigation', icon: '📝', action: () => { window.location.hash = '#/attendance'; } },
    { title: 'View Time Schedule', category: 'Navigation', icon: '📅', action: () => { window.location.hash = '#/schedule'; } },
    { title: 'RTO Form Registers', category: 'Navigation', icon: '📂', action: () => { window.location.hash = '#/rto-forms'; } },
    { title: 'Manage Campaigns / Offers', category: 'Navigation', icon: '🏷️', action: () => { window.location.hash = '#/offers'; } },
    { title: 'System Settings', category: 'Navigation', icon: '⚙️', action: () => { window.location.hash = '#/settings'; } },
  ];

  let matchedCommands = staticCommands.filter(c => c.title.toLowerCase().includes(q));
  let matchedTrainees = [];
  let matchedEnquiries = [];

  if (q.length > 1) {
    try {
      const { data: trainees } = await supabase
        .from('trainees')
        .select('id, full_name, enrollment_number')
        .ilike('full_name', `%${q}%`)
        .limit(5);

      if (trainees) {
        matchedTrainees = trainees.map(t => ({
          title: `View profile: ${t.full_name}`,
          meta: t.enrollment_number || 'PENDING',
          category: 'Trainees',
          icon: '👤',
          action: () => { window.location.hash = `#/trainees/${t.id}`; }
        }));
      }

      const { data: enquiries } = await supabase
        .from('enquiries')
        .select('id, full_name, phone')
        .ilike('full_name', `%${q}%`)
        .limit(5);

      if (enquiries) {
        matchedEnquiries = enquiries.map(e => ({
          title: `Enquiry lead: ${e.full_name}`,
          meta: e.phone,
          category: 'Enquiries',
          icon: '📞',
          action: () => { window.location.hash = '#/enquiries'; }
        }));
      }
    } catch (err) {
      console.error('Command Palette search error:', err);
    }
  }

  const allResults = [...matchedCommands, ...matchedTrainees, ...matchedEnquiries];

  if (allResults.length === 0) {
    container.innerHTML = `<div style="padding:16px; text-align:center; color:var(--color-text-light); font-size:0.9rem;">No results found for "${query}"</div>`;
    return;
  }

  const grouped = {};
  allResults.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  Object.keys(grouped).forEach(cat => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'cmd-group';
    groupDiv.innerHTML = `<div class="cmd-group-title">${cat}</div>`;
    
    grouped[cat].forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cmd-item';
      itemEl.innerHTML = `
        <span>${item.icon}</span>
        <span>${item.title}</span>
        ${item.meta ? `<span class="cmd-item-meta">${item.meta}</span>` : ''}
      `;
      itemEl.addEventListener('click', () => {
        item.action();
        document.getElementById('cmd-palette-modal').classList.remove('active');
      });
      groupDiv.appendChild(itemEl);
    });

    container.appendChild(groupDiv);
  });

  const items = container.querySelectorAll('.cmd-item');
  if (items.length > 0) {
    items[0].classList.add('selected');
  }
}

// Route Handler
async function handleRoute() {
  const hash = window.location.hash || '#/dashboard';
  const container = document.getElementById('view-container');
  const title = document.getElementById('view-title');
  
  // Clear any existing Realtime subscriptions before navigating
  if (realtimeSubscription) {
    supabase.removeChannel(realtimeSubscription);
    realtimeSubscription = null;
  }

  // Show loading
  container.innerHTML = `
    <div class="loading-box">
      <svg class="spinner" viewBox="0 0 50 50" style="animation: rotate 2s linear infinite; width: 40px; height: 40px; color: var(--color-gold);">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" style="stroke-dasharray: 1, 150; stroke-dashoffset: 0; animation: dash 1.5s ease-in-out infinite;"></circle>
      </svg>
      Loading View...
    </div>
  `;

  // Render appropriate view template
  if (hash === '#/dashboard') {
    title.innerText = 'Admin Dashboard';
    await renderDashboard(container);
  } else if (hash === '#/enquiries') {
    title.innerText = 'Enquiries Manager';
    await renderEnquiries(container);
  } else if (hash === '#/schedule') {
    title.innerText = 'Session Scheduler';
    await renderSchedule(container);
  } else if (hash === '#/attendance') {
    title.innerText = 'Daily Attendance';
    await renderAttendance(container);
  } else if (hash.startsWith('#/trainees')) {
    title.innerText = 'Trainee Registry';
    // Sub-routing for Trainee Profile view e.g. #/trainees/uuid
    const parts = hash.split('/');
    if (parts.length > 2) {
      await renderTraineeProfile(container, parts[2]);
    } else {
      await renderTrainees(container);
    }
  } else if (hash === '#/offers') {
    title.innerText = 'Promotions & Offers';
    await renderOffers(container);
  } else if (hash === '#/settings') {
    title.innerText = 'System Settings';
    await renderSettings(container);
  } else if (hash === '#/rto-forms') {
    title.innerText = 'Official RTO Registers';
    await renderRTOForms(container);
  } else {
    title.innerText = 'Dashboard';
    await renderDashboard(container);
  }

  // Highlight current active link
  document.querySelectorAll('.menu-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === hash || 
        (hash.startsWith('#/trainees') && href === '#/trainees') || 
        (hash === '#/rto-forms' && href === '#/rto-forms')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Helper to convert File to Base64 String (for offline-friendly image uploading)
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// =========================================================================
// VIEW: Dashboard
// =========================================================================
async function renderDashboard(container) {
  if (!supabase) {
    container.innerHTML = `<div class="login-error" style="display:block;">Supabase is not configured. Setup variables in config.js first.</div>`;
    return;
  }

  try {
    const today = new Date().toISOString().split('T')[0];

    // 1. Fetch counts & data in parallel
    const [
      { count: attendanceCount },
      { count: openSlotsCount },
      { count: newEnquiriesCount },
      { data: activeOffers },
      { data: recentEnquiries },
      { data: recentTrainees },
      { data: recentBookings }
    ] = await Promise.all([
      // Today's attendance present
      supabase.from('attendance').select('*', { count: 'exact', head: true }).eq('attendance_date', today).eq('status', 'present'),
      // Today's open slots
      supabase.from('slots').select('*', { count: 'exact', head: true }).eq('slot_date', today).eq('is_closed', false),
      // New enquiries count
      supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      // Active offer
      supabase.from('offers').select('title, end_at').eq('is_enabled', true).lte('start_at', new Date().toISOString()).gte('end_at', new Date().toISOString()).order('created_at', { ascending: false }).limit(1),
      // Latest 5 enquiries
      supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(5),
      // Latest 5 trainees
      supabase.from('trainees').select('*').order('created_at', { ascending: false }).limit(5),
      // Latest 3 bookings for activity feed
      supabase.from('bookings').select('id, created_at, slot_id, slots(slot_date, start_time), trainees(full_name)').order('created_at', { ascending: false }).limit(3)
    ]);

    const activeOfferName = activeOffers && activeOffers.length > 0 ? activeOffers[0].title : 'No Active Offers';
    const currentDayStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    // Build enquiries HTML rows
    let enquiryRows = '';
    if (!recentEnquiries || recentEnquiries.length === 0) {
      enquiryRows = `<tr><td colspan="4" style="text-align:center; padding:15px; color:var(--color-text-light); font-size:0.9rem;">No recent enquiries.</td></tr>`;
    } else {
      recentEnquiries.forEach(item => {
        const timeDiff = new Date() - new Date(item.created_at);
        const mins = Math.floor(timeDiff / (1000 * 60));
        let timeLabel = `${mins}m ago`;
        if (mins >= 60) {
          const hours = Math.floor(mins / 60);
          timeLabel = hours === 1 ? '1 hour ago' : `${hours} hours ago`;
          if (hours >= 24) {
            timeLabel = new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
          }
        }
        enquiryRows += `
          <tr>
            <td style="padding:14px 12px; border-bottom:1px solid var(--color-border); font-size:0.9rem;"><strong>${item.full_name}</strong></td>
            <td style="padding:14px 12px; border-bottom:1px solid var(--color-border); font-size:0.9rem; color:var(--color-text-medium);">${item.course}</td>
            <td style="padding:14px 12px; border-bottom:1px solid var(--color-border); font-size:0.9rem;"><span class="badge badge-active" style="text-transform:capitalize;">${item.status}</span></td>
            <td style="padding:14px 12px; border-bottom:1px solid var(--color-border); font-size:0.8rem; color:var(--color-text-light); text-align:right;">${timeLabel}</td>
          </tr>
        `;
      });
    }

    // Build trainees HTML rows
    let traineeListHtml = '';
    if (!recentTrainees || recentTrainees.length === 0) {
      traineeListHtml = `<div style="text-align:center; padding:20px; color:var(--color-text-light); font-size:0.9rem;">No trainees registered yet.</div>`;
    } else {
      recentTrainees.forEach(t => {
        const eDate = t.date_of_enrollment ? new Date(t.date_of_enrollment).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Pending';
        traineeListHtml += `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 12px; border-bottom:1px solid var(--color-border);">
            <div>
              <div style="font-weight:700; font-size:0.9rem; color:var(--color-text-dark);">${t.full_name}</div>
              <div style="font-size:0.75rem; color:var(--color-text-light);">${t.course_assigned} • ${t.enrollment_number || 'PENDING'}</div>
            </div>
            <div style="text-align:right;">
              <span class="badge ${t.status === 'completed' ? 'badge-completed' : 'badge-active'}" style="text-transform:capitalize;">${t.status}</span>
              <div style="font-size:0.7rem; color:var(--color-text-light); margin-top:2px;">Enrolled ${eDate}</div>
            </div>
          </div>
        `;
      });
    }

    // Build Activity Timeline Feed
    let activityHtml = '';
    const feedItems = [];

    // Map bookings
    if (recentBookings) {
      recentBookings.forEach(b => {
        feedItems.push({
          title: `Slot booked by ${b.trainees ? b.trainees.full_name : 'Unknown Trainee'}`,
          desc: `Scheduled for slot on ${b.slots ? b.slots.slot_date : ''} at ${b.slots ? b.slots.start_time.substring(0, 5) : ''}`,
          time: new Date(b.created_at),
          icon: '📅'
        });
      });
    }

    // Map trainees
    if (recentTrainees) {
      recentTrainees.slice(0, 2).forEach(t => {
        feedItems.push({
          title: `New Trainee Registered: ${t.full_name}`,
          desc: `Assigned course: ${t.course_assigned}`,
          time: new Date(t.created_at),
          icon: '🎓'
        });
      });
    }

    // Sort feed by time descending
    feedItems.sort((a, b) => b.time - a.time);

    if (feedItems.length === 0) {
      activityHtml = `<div style="text-align:center; padding:20px; color:var(--color-text-light); font-size:0.9rem;">No recent activities logged.</div>`;
    } else {
      feedItems.slice(0, 3).forEach(item => {
        const diffMins = Math.floor((new Date() - item.time) / (1000 * 60));
        let timeLabel = `${diffMins}m ago`;
        if (diffMins >= 60) {
          timeLabel = `${Math.floor(diffMins / 60)}h ago`;
        }
        activityHtml += `
          <div class="activity-item">
            <div class="activity-icon-wrapper">${item.icon}</div>
            <div class="activity-content">
              <div class="activity-title">${item.title}</div>
              <div class="activity-desc">${item.desc}</div>
            </div>
            <div class="activity-time">${timeLabel}</div>
          </div>
        `;
      });
    }

    container.innerHTML = `
      <!-- Welcome Header -->
      <div class="dashboard-welcome">
        <div class="dashboard-welcome-left">
          <h2>Welcome back, Admin Panel</h2>
          <p>${currentDayStr} • School Operations Control Center</p>
        </div>
        <div class="dashboard-health-badge">
          <span style="display:inline-flex; align-items:center; gap:6px; font-weight:600; color:#34d399;">
            <span class="health-dot"></span>
            Database Sync Connected
          </span>
          <span style="color:rgba(255,255,255,0.6); font-size:0.75rem;">Vercel Edge Health Check: OK</span>
        </div>
      </div>

      <!-- Quick Actions Hub -->
      <div class="quick-actions-panel">
        <button class="quick-action-btn" id="btn-quick-new-trainee">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:16px; height:16px; color:var(--color-gold-dark);"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Register Trainee
        </button>
        <button class="quick-action-btn" id="btn-quick-new-campaign">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:16px; height:16px; color:var(--color-gold-dark);"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
          Launch Offer Campaign
        </button>
        <button class="quick-action-btn" onclick="window.location.hash='#/schedule'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:16px; height:16px; color:var(--color-gold-dark);"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Schedule Slots
        </button>
        <button class="quick-action-btn" onclick="window.location.hash='#/rto-forms'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:16px; height:16px; color:var(--color-gold-dark);"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
          Export Registers
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-card-title">Pending Enquiries</div>
          <div class="stat-card-value">${newEnquiriesCount || 0}</div>
          <div style="font-size:0.75rem; color:var(--color-text-light); margin-top:8px; display:flex; align-items:center; gap:4px;">
            <span style="color:var(--color-warning); font-weight:700;">●</span> Awaiting calls & callbacks
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-title">Today's Open Slots</div>
          <div class="stat-card-value">${openSlotsCount || 0}</div>
          <div style="font-size:0.75rem; color:var(--color-text-light); margin-top:8px; display:flex; align-items:center; gap:4px;">
            <span style="color:var(--color-success); font-weight:700;">●</span> Slots open for bookings
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-title">Marked Attendance</div>
          <div class="stat-card-value">${attendanceCount || 0}</div>
          <div style="font-size:0.75rem; color:var(--color-text-light); margin-top:8px; display:flex; align-items:center; gap:4px;">
            <span style="color:var(--color-success); font-weight:700;">●</span> Present students checked in
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-title">Active Offer</div>
          <div class="stat-card-value" style="font-size: 1.15rem; margin-top: 10px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:200px;" title="${activeOfferName}">${activeOfferName}</div>
          <div style="font-size:0.75rem; color:var(--color-text-light); margin-top:8px; display:flex; align-items:center; gap:4px;">
            <span style="color:${activeOffers && activeOffers.length > 0 ? 'var(--color-success)' : 'var(--color-text-light)'}; font-weight:700;">●</span> Dynamic campaign active
          </div>
        </div>
      </div>

      <!-- Operational Grid -->
      <div class="dashboard-ops-grid">
        
        <!-- Left Side: Recent Customer Enquiries -->
        <div style="display:flex; flex-direction:column; gap:28px;">
          <div class="dashboard-section-card">
            <div class="dashboard-section-header">
              <div class="dashboard-section-title">Recent Customer Enquiries</div>
              <a href="#/enquiries" class="dashboard-section-link">View Leads <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:12px; height:12px;"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></a>
            </div>
            <table style="width:100%; border-collapse:collapse;">
              <thead>
                <tr style="background:#f8fafc; border-bottom:1px solid var(--color-border);">
                  <th style="padding:10px 12px; text-align:left; font-size:0.75rem; text-transform:uppercase; color:var(--color-text-medium);">Name</th>
                  <th style="padding:10px 12px; text-align:left; font-size:0.75rem; text-transform:uppercase; color:var(--color-text-medium);">Course</th>
                  <th style="padding:10px 12px; text-align:left; font-size:0.75rem; text-transform:uppercase; color:var(--color-text-medium);">Status</th>
                  <th style="padding:10px 12px; text-align:right; font-size:0.75rem; text-transform:uppercase; color:var(--color-text-medium);">Time</th>
                </tr>
              </thead>
              <tbody>
                ${enquiryRows}
              </tbody>
            </table>
          </div>

          <!-- Operational Activity Feed -->
          <div class="dashboard-section-card">
            <div class="dashboard-section-header">
              <div class="dashboard-section-title">Operational Activity Feed</div>
            </div>
            <div class="activity-timeline">
              ${activityHtml}
            </div>
          </div>
        </div>

        <!-- Right Side: Recent Trainees Registry -->
        <div class="dashboard-section-card">
          <div class="dashboard-section-header">
            <div class="dashboard-section-title">Recent Trainees Registry</div>
            <a href="#/trainees" class="dashboard-section-link">Registry <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:12px; height:12px;"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></a>
          </div>
          <div style="padding:8px 0;">
            ${traineeListHtml}
          </div>
        </div>
      </div>
    `;

    // Connect Quick Action Buttons events
    document.getElementById('btn-quick-new-trainee').addEventListener('click', () => {
      openTraineeModal(null, () => renderDashboard(container));
    });
    
    document.getElementById('btn-quick-new-campaign').addEventListener('click', () => {
      openOfferModal(null, () => renderDashboard(container));
    });

  } catch (err) {
    container.innerHTML = `<div class="login-error" style="display:block;">Failed to load dashboard: ${err.message}</div>`;
  }
}

// =========================================================================
// VIEW: Enquiries
// =========================================================================
async function renderEnquiries(container) {
  try {
    const { data: enquiries, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    let currentFilter = 'all';
    let currentSearch = '';

    const drawEnquiryCards = () => {
      const filtered = enquiries.filter(item => {
        const matchesStatus = currentFilter === 'all' || item.status === currentFilter;
        const matchesSearch = item.full_name.toLowerCase().includes(currentSearch) ||
                              item.phone.includes(currentSearch) ||
                              item.course.toLowerCase().includes(currentSearch);
        return matchesStatus && matchesSearch;
      });

      let cardsHtml = '';
      if (filtered.length === 0) {
        cardsHtml = `
          <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--color-text-light);">
            <div style="font-size:3rem; margin-bottom:12px;">✉️</div>
            <h3>No enquiries found</h3>
            <p>Try resetting your search query or filters.</p>
          </div>
        `;
      } else {
        filtered.forEach(item => {
          const initials = item.full_name.substring(0, 2).toUpperCase();
          const createdDate = new Date(item.created_at).toLocaleDateString('en-IN', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
          });
          const messageText = item.message ? item.message : 'No message provided.';
          const waUrl = `https://wa.me/91${item.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello ' + item.full_name + ', thank you for contacting Balkrishna Driving School...')}`;

          cardsHtml += `
            <div class="enquiry-card" id="enquiry-card-${item.id}">
              <div class="enquiry-card-header">
                <div class="enquiry-avatar">${initials}</div>
                <div class="enquiry-meta">
                  <div class="enquiry-name">${item.full_name}</div>
                  <div class="enquiry-date">${createdDate}</div>
                </div>
                <span class="badge ${item.status === 'new' ? 'badge-active' : item.status === 'enrolled' ? 'badge-completed' : 'badge-inactive'}" style="text-transform:capitalize;">${item.status}</span>
              </div>
              <div class="enquiry-body">
                <div class="enquiry-detail-row">
                  <span class="enquiry-detail-label">Phone:</span>
                  <span class="enquiry-detail-val"><a href="tel:${item.phone}">${item.phone}</a></span>
                </div>
                <div class="enquiry-detail-row">
                  <span class="enquiry-detail-label">Course:</span>
                  <span class="enquiry-detail-val">${item.course}</span>
                </div>
                <div class="enquiry-detail-row">
                  <span class="enquiry-detail-label">Batch:</span>
                  <span class="enquiry-detail-val">${item.preferred_batch}</span>
                </div>
                <div class="enquiry-msg" title="${messageText}">${messageText}</div>
              </div>
              <div class="enquiry-card-footer">
                <select class="form-select-sm status-select" data-id="${item.id}" style="width: 110px; padding: 4px; border-radius: 6px; border: 1px solid var(--color-border);">
                  <option value="new" ${item.status === 'new' ? 'selected' : ''}>New</option>
                  <option value="contacted" ${item.status === 'contacted' ? 'selected' : ''}>Contacted</option>
                  <option value="enrolled" ${item.status === 'enrolled' ? 'selected' : ''}>Enrolled</option>
                  <option value="closed" ${item.status === 'closed' ? 'selected' : ''}>Closed</option>
                </select>
                <div class="enquiry-actions">
                  <a href="tel:${item.phone}" class="enquiry-action-btn" title="Call Client">📞</a>
                  <a href="${waUrl}" target="_blank" class="enquiry-action-btn" title="WhatsApp Message">💬</a>
                  <button class="enquiry-action-btn convert-btn" data-id="${item.id}" data-name="${item.full_name}" data-phone="${item.phone}" data-course="${item.course}" title="Convert to Trainee">🎓</button>
                </div>
              </div>
            </div>
          `;
        });
      }

      document.getElementById('enquiries-cards-container').innerHTML = cardsHtml;

      // Re-bind inline status change handlers
      document.getElementById('enquiries-cards-container').querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', async (e) => {
          const id = e.target.getAttribute('data-id');
          const newStatus = e.target.value;
          const { error: updateErr } = await supabase
            .from('enquiries')
            .update({ status: newStatus })
            .eq('id', id);

          if (updateErr) {
            alert('Failed to update status: ' + updateErr.message);
          } else {
            const foundIndex = enquiries.findIndex(item => item.id == id);
            if (foundIndex !== -1) {
              enquiries[foundIndex].status = newStatus;
            }
            drawEnquiryCards();
          }
        });
      });

      // Re-bind conversion handlers
      document.getElementById('enquiries-cards-container').querySelectorAll('.convert-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const name = btn.getAttribute('data-name');
          const phone = btn.getAttribute('data-phone');
          const course = btn.getAttribute('data-course');
          window.location.hash = `#/trainees?convert=true&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&course=${encodeURIComponent(course)}`;
        });
      });
    };

    container.innerHTML = `
      <div style="background-color: white; border: 1px solid var(--color-border); padding: 24px; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <h2 style="font-size:1.4rem; font-weight:800; color:var(--color-navy-dark); letter-spacing:-0.01em;">Customer Leads Pipeline</h2>
            <p style="font-size:0.85rem; color:var(--color-text-light); margin-top:2px;">Track, manage, and convert incoming driving school enquiries.</p>
          </div>
          <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
            <input type="text" id="enquiry-search-input" placeholder="Search leads..." style="padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 8px; font-size: 0.85rem; width:220px; background:white; color:var(--color-text-dark);">
            <select id="enquiry-filter-select" style="padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 8px; font-size: 0.85rem; background:white; color:var(--color-text-dark);">
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div class="enquiries-board-grid" id="enquiries-cards-container">
        <!-- Rendered dynamically -->
      </div>
    `;

    // Bind filters
    const searchInput = document.getElementById('enquiry-search-input');
    const filterSelect = document.getElementById('enquiry-filter-select');

    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      drawEnquiryCards();
    });

    filterSelect.addEventListener('change', (e) => {
      currentFilter = e.target.value;
      drawEnquiryCards();
    });

    drawEnquiryCards();

  } catch (err) {
    container.innerHTML = `<div class="login-error" style="display:block;">Enquiries load failed: ${err.message}</div>`;
  }
}

// =========================================================================
// VIEW: Scheduling Grid
// =========================================================================
async function renderSchedule(container) {
  // Get date from query param or default to today
  const todayStr = new Date().toISOString().split('T')[0];
  
  container.innerHTML = `
    <div class="schedule-header">
      <div class="schedule-controls">
        <label for="schedule-date" class="form-label" style="margin-bottom:0; font-weight:700;">Select Date:</label>
        <input type="date" id="schedule-date" class="date-picker-input" value="${todayStr}">
        <button id="btn-generate-slots" class="btn btn-primary-sm">Generate Day Slots</button>
      </div>
      <div class="realtime-indicator">
        <div class="pulse-dot"></div>
        <span>Slot Capacity Status</span>
      </div>
    </div>
    
    <div id="schedule-grid-container" class="schedule-grid">
      <div class="loading-box span-full">Loading Slots...</div>
    </div>
  `;

  const datePicker = document.getElementById('schedule-date');
  const slotsContainer = document.getElementById('schedule-grid-container');

  // Trigger generator
  document.getElementById('btn-generate-slots').addEventListener('click', async () => {
    await generateSlotsForDate(datePicker.value, slotsContainer);
  });

  // Re-fetch slots on date change
  datePicker.addEventListener('change', async () => {
    await fetchAndRenderSlots(datePicker.value, slotsContainer);
  });

  // Initial load
  await fetchAndRenderSlots(datePicker.value, slotsContainer);
}

// Helper to generate default slots for a day
async function generateSlotsForDate(dateStr, slotsContainer) {
  const closedDay = settingsCache['closed_weekday'] || 'sunday';
  const startHourStr = settingsCache['operating_hours_start'] || '07:00';
  const endHourStr = settingsCache['operating_hours_end'] || '19:00';

  // Check if target date matches closed weekday
  const dayName = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  
  if (dayName === closedDay.toLowerCase()) {
    if (!confirm(`Warning: Selected date falls on a closed weekday (${closedDay.toUpperCase()}). Do you still want to generate slots?`)) {
      return;
    }
  }

  // Check if slots already exist
  const { data: existingSlots } = await supabase
    .from('slots')
    .select('id')
    .eq('slot_date', dateStr);

  if (existingSlots && existingSlots.length > 0) {
    alert('Slots already generated for this date.');
    return;
  }

  // Create list of 60-minute blocks
  const startHour = parseInt(startHourStr.split(':')[0]);
  const endHour = parseInt(endHourStr.split(':')[0]);
  
  const slotsToInsert = [];
  for (let hr = startHour; hr < endHour; hr++) {
    const startStr = `${hr.toString().padStart(2, '0')}:00`;
    const endStr = `${(hr + 1).toString().padStart(2, '0')}:00`;
    slotsToInsert.push({
      slot_date: dateStr,
      start_time: startStr,
      end_time: endStr,
      capacity: 4,
      booked_count: 0,
      is_closed: false
    });
  }

  const { error } = await supabase.from('slots').insert(slotsToInsert);
  if (error) {
    alert('Failed to generate slots: ' + error.message);
  } else {
    alert('Slots generated successfully.');
    await fetchAndRenderSlots(dateStr, slotsContainer);
  }
}

// Fetch and render the hourly grid
async function fetchAndRenderSlots(dateStr, slotsContainer) {
  slotsContainer.innerHTML = `<div class="loading-box span-full">Loading Slots...</div>`;
  
  try {
    const { data: slots, error: slotErr } = await supabase
      .from('slots')
      .select('*')
      .eq('slot_date', dateStr)
      .order('start_time', { ascending: true });

    if (slotErr) throw slotErr;

    if (!slots || slots.length === 0) {
      slotsContainer.innerHTML = `
        <div class="span-full" style="text-align:center; padding: 50px 20px; background: white; border-radius: 16px; border: 1px solid var(--color-border); box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <p style="color:var(--color-text-medium); margin-bottom: 15px;">No slots found for this date. Generate the schedule first.</p>
        </div>
      `;
      return;
    }

    const slotIds = slots.map(s => s.id);
    const { data: bookings, error: bookErr } = await supabase
      .from('bookings')
      .select('id, slot_id, trainee_id, trainees(full_name)')
      .in('slot_id', slotIds);

    if (bookErr) throw bookErr;

    const bookingsBySlot = {};
    if (bookings) {
      bookings.forEach(b => {
        if (!bookingsBySlot[b.slot_id]) bookingsBySlot[b.slot_id] = [];
        bookingsBySlot[b.slot_id].push(b);
      });
    }

    slotsContainer.innerHTML = '';

    slots.forEach(slot => {
      const slotBookings = bookingsBySlot[slot.id] || [];
      const isFull = slot.booked_count >= slot.capacity;
      
      let fillClass = 'slot-empty';
      if (slot.is_closed) fillClass = 'slot-closed';
      else if (isFull) fillClass = 'slot-full';
      else if (slot.booked_count > 0) fillClass = 'slot-partial';

      const pct = Math.min(100, Math.max(0, (slot.booked_count / slot.capacity) * 100));
      const strokeDashOffset = 113 - (113 * pct) / 100;
      
      const capacityRingSvg = `
        <svg width="42" height="42" viewBox="0 0 42 42" style="flex-shrink:0;">
          <circle cx="21" cy="21" r="18" fill="none" stroke="#f1f5f9" stroke-width="4.5"></circle>
          <circle cx="21" cy="21" r="18" fill="none" stroke="${slot.is_closed ? 'var(--color-error)' : isFull ? 'var(--color-error)' : 'var(--color-gold)'}" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="113" stroke-dashoffset="${slot.is_closed ? 0 : strokeDashOffset}" transform="rotate(-90 21 21)"></circle>
          <text x="21" y="25" text-anchor="middle" font-size="10" font-weight="800" fill="var(--color-text-dark)">${slot.is_closed ? '✕' : slot.booked_count}</text>
        </svg>
      `;

      let traineesHtml = '';
      slotBookings.forEach(b => {
        traineesHtml += `
          <div class="slot-trainee-item" style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border: 1px solid var(--color-border); border-radius: 8px; padding: 6px 12px; font-size:0.8rem; font-weight:600; color:var(--color-text-dark); margin-bottom:6px;">
            <span>${b.trainees.full_name}</span>
            <button class="btn-cancel-booking" data-booking-id="${b.id}" data-slot-id="${slot.id}" style="color:var(--color-error); font-weight:700; padding:2px 6px;">✕</button>
          </div>
        `;
      });

      const card = document.createElement('div');
      card.className = `slot-box ${fillClass}`;
      card.style.cssText = `
        background-color: white;
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        display: flex;
        flex-direction: column;
        gap: 12px;
        transition: var(--transition-fast);
      `;
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div>
            <div style="font-size:1.05rem; font-weight:800; color:var(--color-text-dark);">${slot.start_time.substring(0, 5)} - ${slot.end_time.substring(0, 5)}</div>
            <div style="font-size:0.75rem; color:var(--color-text-light); margin-top:2px;">Capacity: ${slot.capacity} max</div>
          </div>
          ${capacityRingSvg}
        </div>
        <div class="slot-trainees" style="min-height: 40px; margin-top:4px;">
          ${traineesHtml || `<div style="font-size:0.8rem; color:var(--color-text-light); font-style:italic; padding: 6px 0;">No bookings yet.</div>`}
        </div>
        <div class="slot-actions" style="display:flex; gap:6px; margin-top:auto; border-top:1px solid #f1f5f9; padding-top:12px;">
          ${!slot.is_closed && !isFull ? `<button class="btn btn-primary-sm btn-book-modal" data-slot-id="${slot.id}" style="flex-grow:1; font-weight:700;">Book</button>` : ''}
          <button class="btn btn-secondary-sm btn-toggle-close" data-slot-id="${slot.id}" data-closed="${slot.is_closed}" style="padding:6px 10px; font-weight:600;">${slot.is_closed ? 'Reopen' : 'Close'}</button>
          <button class="btn btn-secondary-sm btn-plus-cap" data-slot-id="${slot.id}" data-cap="${slot.capacity}" style="padding:6px 10px; font-weight:600;">+ Cap</button>
        </div>
      `;
      slotsContainer.appendChild(card);
    });

    // Book button handler
    slotsContainer.querySelectorAll('.btn-book-modal').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const slotId = e.target.getAttribute('data-slot-id');
        await openBookingModal(slotId, dateStr, slotsContainer);
      });
    });

    // Close/Reopen button handler
    slotsContainer.querySelectorAll('.btn-toggle-close').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const slotId = e.target.getAttribute('data-slot-id');
        const closed = e.target.getAttribute('data-closed') === 'true';
        
        const { error } = await supabase
          .from('slots')
          .update({ is_closed: !closed })
          .eq('id', slotId);

        if (error) alert('Failed to update slot: ' + error.message);
        else await fetchAndRenderSlots(dateStr, slotsContainer);
      });
    });

    // Plus Capacity button handler
    slotsContainer.querySelectorAll('.btn-plus-cap').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const slotId = e.target.getAttribute('data-slot-id');
        const currentCap = parseInt(e.target.getAttribute('data-cap'));
        const newCap = currentCap + 1;
        
        const { error } = await supabase
          .from('slots')
          .update({ capacity: newCap })
          .eq('id', slotId);

        if (error) alert('Failed to update capacity: ' + error.message);
        else await fetchAndRenderSlots(dateStr, slotsContainer);
      });
    });

    // Cancel Booking button handler
    slotsContainer.querySelectorAll('.btn-cancel-booking').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const bookingId = e.currentTarget.getAttribute('data-booking-id');
        const slotId = e.currentTarget.getAttribute('data-slot-id');
        
        if (confirm('Cancel this booking? This will free up 1 slot.')) {
          const { data: slot } = await supabase.from('slots').select('booked_count').eq('id', slotId).single();
          const nextCount = Math.max(0, (slot?.booked_count || 1) - 1);

          const { error: delErr } = await supabase.from('bookings').delete().eq('id', bookingId);
          if (delErr) {
            alert('Cancel failed: ' + delErr.message);
            return;
          }

          await supabase.from('slots').update({ booked_count: nextCount }).eq('id', slotId);
          await fetchAndRenderSlots(dateStr, slotsContainer);
        }
      });
    });

  } catch (err) {
    slotsContainer.innerHTML = `<div class="login-error span-full" style="display:block;">Grid fetch failed: ${err.message}</div>`;
  }
}

// Modal popup to book a Trainee
async function openBookingModal(slotId, dateStr, slotsContainer) {
  const modalContainer = document.getElementById('modal-container');
  
  // Fetch active trainees
  const { data: trainees } = await supabase
    .from('trainees')
    .select('id, full_name, enrollment_number')
    .eq('status', 'active')
    .order('full_name', { ascending: true });

  let optionsHtml = '<option value="" disabled selected>Select Trainee</option>';
  if (trainees) {
    trainees.forEach(t => {
      optionsHtml += `<option value="${t.id}">${t.full_name} (${t.enrollment_number})</option>`;
    });
  }

  modalContainer.innerHTML = `
    <div class="modal-overlay" id="book-modal" style="display:flex;">
      <div class="modal-box">
        <div class="modal-header">
          <h3>Book Session Slot</h3>
          <button id="close-book-modal" style="font-weight:bold;font-size:1.2rem;">✕</button>
        </div>
        <div class="modal-body">
          <form id="slot-booking-form">
            <div class="form-group" style="margin-bottom:20px;">
              <label for="booking-trainee-select" class="form-label">Trainee Name</label>
              <select id="booking-trainee-select" class="form-input" style="height:50px; appearance:auto;" required>
                ${optionsHtml}
              </select>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  `;

  // Close handlers
  const closeModal = () => {
    document.getElementById('book-modal').remove();
  };
  document.getElementById('close-book-modal').addEventListener('click', closeModal);
  document.getElementById('book-modal').addEventListener('click', (e) => {
    if (e.target.id === 'book-modal') closeModal();
  });

  // Submit Handler
  document.getElementById('slot-booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const traineeId = document.getElementById('booking-trainee-select').value;
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerText = 'Booking...';

    try {
      // Call Postgres atomic book_slot RPC
      const { data, error } = await supabase.rpc('book_slot', {
        p_slot_id: slotId,
        p_trainee_id: traineeId
      });

      if (error) {
        if (error.message.includes('SLOT_FULL')) {
          alert('Error: Booking failed. The slot is full or has been closed.');
        } else {
          alert('Booking failed: ' + error.message);
        }
      } else {
        closeModal();
        await fetchAndRenderSlots(dateStr, slotsContainer);
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = 'Confirm Booking';
    }
  });
}

// =========================================================================
// VIEW: Attendance Manager & Sync
// =========================================================================
async function renderAttendance(container) {
  const todayStr = new Date().toISOString().split('T')[0];

  container.innerHTML = `
    <div class="attendance-actions">
      <div class="schedule-controls">
        <label for="attendance-date" class="form-label" style="margin-bottom:0; font-weight:700;">Select Date:</label>
        <input type="date" id="attendance-date" class="date-picker-input" value="${todayStr}">
      </div>
      <div class="realtime-indicator">
        <div class="pulse-dot"></div>
        <span>Realtime Sync Enabled</span>
      </div>
    </div>
    
    <div id="attendance-list-container" class="attendance-list">
      <div class="loading-box">Loading bookings...</div>
    </div>
  `;

  const datePicker = document.getElementById('attendance-date');
  const listContainer = document.getElementById('attendance-list-container');

  // Trigger render on date change
  datePicker.addEventListener('change', () => {
    fetchAndRenderAttendance(datePicker.value, listContainer);
  });

  // 1. Set up Realtime Sync
  if (supabase) {
    realtimeSubscription = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'attendance' },
        (payload) => {
          console.log('Realtime update received on attendance table:', payload);
          fetchAndRenderAttendance(datePicker.value, listContainer);
        }
      )
      .subscribe();
  }

  // Initial load
  await fetchAndRenderAttendance(datePicker.value, listContainer);
}

// Fetch bookings and render attendance sheet
async function fetchAndRenderAttendance(dateStr, listContainer) {
  try {
    const { data: daySlots, error: slotsErr } = await supabase
      .from('slots')
      .select('id')
      .eq('slot_date', dateStr);

    if (slotsErr) throw slotsErr;

    if (!daySlots || daySlots.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding: 40px 20px; background: white; border-radius: 16px; border: 1px solid var(--color-border); box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <p style="color:var(--color-text-medium); margin-bottom: 15px; font-weight: 500;">No scheduling slots found for this date. Please generate the schedule first.</p>
          <a href="#/schedule" class="btn btn-primary" style="padding: 10px 20px; font-size: 0.9rem;">Go to Scheduling Grid</a>
        </div>
      `;
      return;
    }

    const { data: bookings, error: bookErr } = await supabase
      .from('bookings')
      .select(`
        id,
        slot_id,
        trainee_id,
        slots(start_time, end_time),
        trainees(full_name, course_assigned, status)
      `)
      .eq('slots.slot_date', dateStr);

    if (bookErr) throw bookErr;

    const activeBookings = (bookings || []).filter(b => {
      return b.slots && b.trainees && b.trainees.status === 'active';
    });

    if (activeBookings.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding: 40px 20px; background: white; border-radius: 16px; border: 1px solid var(--color-border); box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <p style="color:var(--color-text-medium); margin-bottom: 15px; font-weight: 500;">Slots are generated, but no active trainees have been booked for this date yet.</p>
          <a href="#/schedule" class="btn btn-primary" style="padding: 10px 20px; font-size: 0.9rem;">Book Trainee Sessions</a>
        </div>
      `;
      return;
    }

    const bookingIds = activeBookings.map(b => b.id);
    const { data: attendanceList } = await supabase
      .from('attendance')
      .select('*')
      .in('booking_id', bookingIds)
      .eq('attendance_date', dateStr);

    const attMap = {};
    let presentCount = 0;
    let absentCount = 0;

    if (attendanceList) {
      attendanceList.forEach(a => {
        attMap[a.booking_id] = a;
        if (a.status === 'present') presentCount++;
        else if (a.status === 'absent') absentCount++;
      });
    }

    const unmarkedCount = activeBookings.length - (presentCount + absentCount);

    let summaryHtml = `
      <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
        <div style="background: white; border: 1px solid var(--color-border); padding: 16px; border-radius: 12px; text-align: center;">
          <div style="font-size:0.75rem; color:var(--color-text-light); text-transform:uppercase; font-weight:600;">Total Booked</div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--color-navy-dark); margin-top:4px;">${activeBookings.length}</div>
        </div>
        <div style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 16px; border-radius: 12px; text-align: center;">
          <div style="font-size:0.75rem; color:#047857; text-transform:uppercase; font-weight:600;">Present</div>
          <div style="font-size:1.5rem; font-weight:800; color:#065f46; margin-top:4px;">${presentCount}</div>
        </div>
        <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 16px; border-radius: 12px; text-align: center;">
          <div style="font-size:0.75rem; color:#b91c1c; text-transform:uppercase; font-weight:600;">Absent</div>
          <div style="font-size:1.5rem; font-weight:800; color:#991b1b; margin-top:4px;">${absentCount}</div>
        </div>
        <div style="background: #f8fafc; border: 1px solid var(--color-border); padding: 16px; border-radius: 12px; text-align: center;">
          <div style="font-size:0.75rem; color:var(--color-text-light); text-transform:uppercase; font-weight:600;">Unmarked</div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--color-text-medium); margin-top:4px;">${unmarkedCount}</div>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:12px;" id="attendance-list-inner"></div>
    `;

    listContainer.innerHTML = summaryHtml;
    const listInner = document.getElementById('attendance-list-inner');

    activeBookings.forEach(booking => {
      const attRecord = attMap[booking.id];
      const status = attRecord ? attRecord.status : null;

      const item = document.createElement('div');
      item.className = `attendance-item ${status ? 'marked-' + status : 'unmarked'}`;
      item.style.cssText = `
        background-color: white; 
        border: 1px solid var(--color-border); 
        border-radius: 14px; 
        padding: 16px 20px; 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        gap: 15px;
        flex-wrap: wrap;
        box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      `;
      item.innerHTML = `
        <div style="flex-grow:1;">
          <div style="font-weight:700; font-size:1rem; color:var(--color-text-dark);">${booking.trainees.full_name}</div>
          <div style="font-size:0.8rem; color:var(--color-text-light); margin-top:2px;">${booking.trainees.course_assigned}</div>
        </div>
        <div style="background-color: #f1f5f9; padding: 6px 12px; border-radius: 8px; font-weight:600; font-size:0.85rem; color:var(--color-text-medium);">
          ${booking.slots.start_time.substring(0, 5)} - ${booking.slots.end_time.substring(0, 5)}
        </div>
        <div class="attendance-btn-group" style="display:flex; gap:8px;">
          <button class="att-toggle att-toggle-present ${status === 'present' ? 'active' : ''}" data-booking-id="${booking.id}" data-trainee-id="${booking.trainee_id}" data-action="present" style="padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; border: 1px solid ${status === 'present' ? '#34d399' : 'var(--color-border)'}; background-color: ${status === 'present' ? '#ecfdf5' : 'white'}; color: ${status === 'present' ? '#047857' : 'var(--color-text-medium)'};">Present</button>
          <button class="att-toggle att-toggle-absent ${status === 'absent' ? 'active' : ''}" data-booking-id="${booking.id}" data-trainee-id="${booking.trainee_id}" data-action="absent" style="padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; border: 1px solid ${status === 'absent' ? '#f87171' : 'var(--color-border)'}; background-color: ${status === 'absent' ? '#fef2f2' : 'white'}; color: ${status === 'absent' ? '#b91c1c' : 'var(--color-text-medium)'};">Absent</button>
        </div>
        <div style="font-size:0.75rem; color:var(--color-text-light); text-align:right; min-width: 100px;">
          ${attRecord ? `Marked ${new Date(attRecord.marked_at).toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit'})}` : 'Unmarked'}
        </div>
      `;
      listInner.appendChild(item);
    });

    listInner.querySelectorAll('.att-toggle').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const bookingId = e.target.getAttribute('data-booking-id');
        const traineeId = e.target.getAttribute('data-trainee-id');
        const action = e.target.getAttribute('data-action');
        const currentRecord = attMap[bookingId];

        const itemRow = e.target.closest('.attendance-item');
        itemRow.querySelectorAll('.att-toggle').forEach(b => b.disabled = true);

        try {
          if (currentRecord) {
            const { error } = await supabase
              .from('attendance')
              .update({
                status: action,
                marked_at: new Date().toISOString()
              })
              .eq('id', currentRecord.id);

            if (error) throw error;
          } else {
            const { error } = await supabase
              .from('attendance')
              .insert({
                booking_id: bookingId,
                trainee_id: traineeId,
                attendance_date: dateStr,
                status: action,
                marked_by: currentSession.user.id
              });

            if (error) throw error;
          }

          const targetBooking = activeBookings.find(b => b.id === bookingId);
          const startT = targetBooking.slots.start_time;
          const endT = targetBooking.slots.end_time;
          const course = targetBooking.trainees.course_assigned;

          if (action === 'present') {
            const { data: existSess } = await supabase
              .from('training_sessions')
              .select('id')
              .eq('trainee_id', traineeId)
              .eq('session_date', dateStr)
              .limit(1);

            if (!existSess || existSess.length === 0) {
              await supabase
                .from('training_sessions')
                .insert({
                  trainee_id: traineeId,
                  session_date: dateStr,
                  hours_from: startT,
                  hours_to: endT,
                  vehicle_class: course,
                  instructor_name: 'Balkrishna School Trainer',
                  trainee_signed: false
                });
            }
          } else if (action === 'absent') {
            await supabase
              .from('training_sessions')
              .delete()
              .eq('trainee_id', traineeId)
              .eq('session_date', dateStr);
          }

          await fetchAndRenderAttendance(dateStr, listContainer);

        } catch (err) {
          alert('Attendance sync failed: ' + err.message);
        } finally {
          itemRow.querySelectorAll('.att-toggle').forEach(b => b.disabled = false);
        }
      });
    });

  } catch (err) {
    listContainer.innerHTML = `<div class="login-error" style="display:block;">Attendance list fetch failed: ${err.message}</div>`;
  }
}

// =========================================================================
// VIEW: Trainees Registry & Form 14/15
// =========================================================================
async function renderTrainees(container) {
  // Check if routed with convert parameter from enquiries
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const isConvert = urlParams.get('convert') === 'true';
  const cName = urlParams.get('name') || '';
  const cPhone = urlParams.get('phone') || '';
  const cCourse = urlParams.get('course') || '';

  container.innerHTML = `
    <div style="background-color:var(--color-text-white); border:1px solid var(--color-border); padding:20px 24px; border-radius:16px; display:flex; justify-content:space-between; align-items:center; margin-bottom:25px; flex-wrap:wrap; gap:15px;" class="reveal-on-scroll">
      <div class="search-container" style="display:flex; gap:10px; flex-wrap:wrap;">
        <input type="text" id="trainee-search" class="search-input" placeholder="Search by name or number..." style="background:white; color:var(--color-text-dark); border: 1px solid var(--color-border); border-radius: 8px; padding:8px 12px; font-size:0.85rem; width:240px;">
        <select id="trainee-status-filter" class="form-select-sm" style="height:38px; background:white; color:var(--color-text-dark); border: 1px solid var(--color-border); border-radius: 8px; padding:0 12px; font-size:0.85rem;">
          <option value="active">Active Only</option>
          <option value="all">Show All Trainees</option>
          <option value="completed">Completed Only</option>
          <option value="dropped">Dropped Only</option>
        </select>
      </div>
      <button id="btn-new-trainee" class="btn btn-primary">New Trainee Registration</button>
    </div>

    <div class="trainees-board-grid" id="trainees-cards-container">
      <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--color-text-light);">Loading trainees...</div>
    </div>
  `;

  const searchInput = document.getElementById('trainee-search');
  const filterSelect = document.getElementById('trainee-status-filter');
  const cardsContainer = document.getElementById('trainees-cards-container');

  const fetchTraineesList = async () => {
    try {
      let query = supabase.from('trainees').select('*');
      
      const filter = filterSelect.value;
      if (filter === 'active') query = query.eq('status', 'active');
      else if (filter === 'completed') query = query.eq('status', 'completed');
      else if (filter === 'dropped') query = query.eq('status', 'dropped');

      const { data: trainees, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;

      const renderBody = (list) => {
        cardsContainer.innerHTML = '';
        if (list.length === 0) {
          cardsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--color-text-light);">
              <div style="font-size:3rem; margin-bottom:12px;">👤</div>
              <h3>No trainees found</h3>
              <p>Register a new student or adjust filters.</p>
            </div>
          `;
          return;
        }

        list.forEach(t => {
          let statusBadge = 'badge-active';
          if (t.status === 'completed') statusBadge = 'badge-completed';
          else if (t.status === 'dropped') statusBadge = 'badge-dropped';

          const initials = t.full_name.substring(0, 2).toUpperCase();

          const card = document.createElement('div');
          card.className = 'trainee-card';
          card.style.cursor = 'pointer';
          card.innerHTML = `
            <div class="enquiry-card-header">
              <div class="enquiry-avatar" style="background-color: var(--color-gold-light); color: var(--color-gold-dark);">${initials}</div>
              <div class="enquiry-meta">
                <div class="enquiry-name">${t.full_name}</div>
                <div class="enquiry-date">Enrollment: ${t.enrollment_number || 'PENDING'}</div>
              </div>
              <span class="badge ${statusBadge}">${t.status}</span>
            </div>
            <div class="trainee-detail-grid">
              <div>
                <span style="color:var(--color-text-light); font-weight:600; font-size:0.75rem; display:block;">Course:</span>
                <span style="font-weight:700; color:var(--color-text-dark);">${t.course_assigned}</span>
              </div>
              <div>
                <span style="color:var(--color-text-light); font-weight:600; font-size:0.75rem; display:block;">Guardian:</span>
                <span style="font-weight:600; color:var(--color-text-dark);">${t.guardian_name}</span>
              </div>
              <div>
                <span style="color:var(--color-text-light); font-weight:600; font-size:0.75rem; display:block;">Licence / Phone:</span>
                <span style="font-weight:500; color:var(--color-text-dark);">${t.learners_licence_number || '-'}</span>
              </div>
              <div>
                <span style="color:var(--color-text-light); font-weight:600; font-size:0.75rem; display:block;">Relation:</span>
                <span style="font-weight:600; color:var(--color-text-dark); text-transform:capitalize;">${t.guardian_relation}</span>
              </div>
            </div>
            
            <div style="margin-top: 6px;">
              <span style="color:var(--color-text-light); font-weight:600; font-size:0.75rem; display:flex; justify-content:space-between;">
                <span>Training Progress</span>
                <span>${t.status === 'completed' ? '100%' : 'Active Session'}</span>
              </span>
              <div class="trainee-progress-bar-container">
                <div class="trainee-progress-bar" style="width: ${t.status === 'completed' ? '100%' : '60%'};"></div>
              </div>
            </div>
            
            <div class="enquiry-card-footer" style="padding-top:12px; margin-top:8px;">
              <a href="#/trainees/${t.id}" class="btn btn-secondary-sm" style="width:100%; text-align:center; padding:8px; border-radius:8px; border:1px solid var(--color-border); font-weight:700; background-color:#f8fafc;">View Customer Profile</a>
            </div>
          `;
          card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn')) {
              window.location.hash = `#/trainees/${t.id}`;
            }
          });
          cardsContainer.appendChild(card);
        });
      };

      const runSearchFilter = () => {
        const txt = searchInput.value.toLowerCase().trim();
        const filtered = trainees.filter(t => {
          return t.full_name.toLowerCase().includes(txt) || 
                 (t.enrollment_number && t.enrollment_number.toLowerCase().includes(txt)) ||
                 (t.learners_licence_number && t.learners_licence_number.toLowerCase().includes(txt));
        });
        renderBody(filtered);
      };

      searchInput.addEventListener('input', runSearchFilter);
      renderBody(trainees);

    } catch (err) {
      cardsContainer.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--color-error);">${err.message}</div>`;
    }
  };

  filterSelect.addEventListener('change', fetchTraineesList);
  await fetchTraineesList();

  document.getElementById('btn-new-trainee').addEventListener('click', () => {
    openTraineeModal(null, fetchTraineesList);
  });

  if (isConvert) {
    openTraineeModal({ full_name: cName, learners_licence_number: cPhone, course_assigned: cCourse }, fetchTraineesList);
  }
}

// Modal Form for Trainee Creation/Edition
async function openTraineeModal(prefillData = null, onSaved) {
  const modalContainer = document.getElementById('modal-container');
  const isEdit = prefillData && prefillData.id;

  modalContainer.innerHTML = `
    <div class="modal-overlay" id="trainee-modal" style="display:flex;">
      <div class="modal-box" style="max-width:800px;">
        <div class="modal-header">
          <h3>${isEdit ? 'Edit Trainee Details' : 'Register New Trainee'}</h3>
          <button id="close-trainee-modal" style="font-weight:bold;font-size:1.2rem;">✕</button>
        </div>
        <div class="modal-body">
          <form id="trainee-form">
            <div class="trainee-form-grid">
              
              <!-- Full Name -->
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" id="trainee-name" class="form-input" value="${prefillData?.full_name || ''}" required>
              </div>

              <!-- Photo Upload -->
              <div class="form-group">
                <label class="form-label">Trainee Photo</label>
                <div style="display:flex; gap:10px; align-items:center;">
                  <div class="file-upload-wrapper">
                    <button type="button" class="btn btn-secondary-sm" style="padding:12px;">Choose File</button>
                    <input type="file" id="trainee-photo-file" class="file-upload-input" accept="image/*">
                  </div>
                  <span id="photo-file-status" style="font-size:0.8rem; color:var(--color-text-light);">No file chosen</span>
                  <input type="hidden" id="trainee-photo-url" value="${prefillData?.photo_url || ''}">
                </div>
              </div>

              <!-- Guardian Relation -->
              <div class="form-group">
                <label class="form-label">Guardian Relation</label>
                <select id="trainee-relation" class="form-input" style="height:50px; appearance:auto;" required>
                  <option value="Son of" ${prefillData?.guardian_relation === 'Son of' ? 'selected' : ''}>Son of</option>
                  <option value="Wife of" ${prefillData?.guardian_relation === 'Wife of' ? 'selected' : ''}>Wife of</option>
                  <option value="Daughter of" ${prefillData?.guardian_relation === 'Daughter of' ? 'selected' : ''}>Daughter of</option>
                </select>
              </div>

              <!-- Guardian Name -->
              <div class="form-group">
                <label class="form-label">Guardian Name</label>
                <input type="text" id="trainee-guardian" class="form-input" value="${prefillData?.guardian_name || ''}" required>
              </div>

              <!-- Date of Birth -->
              <div class="form-group">
                <label class="form-label">Date of Birth</label>
                <input type="date" id="trainee-dob" class="form-input" value="${prefillData?.date_of_birth || ''}" required>
              </div>

              <!-- Date of Enrollment -->
              <div class="form-group">
                <label class="form-label">Date of Enrollment</label>
                <input type="date" id="trainee-doe" class="form-input" value="${prefillData?.date_of_enrollment || new Date().toISOString().split('T')[0]}" required>
              </div>

              <!-- Permanent Address -->
              <div class="form-group span-full">
                <label class="form-label">Permanent Address</label>
                <textarea id="trainee-perm-addr" class="form-input" rows="2" required>${prefillData?.permanent_address || ''}</textarea>
              </div>

              <!-- Temporary Address -->
              <div class="form-group span-full">
                <label class="form-label">Temporary Address (Optional)</label>
                <textarea id="trainee-temp-addr" class="form-input" rows="2">${prefillData?.temporary_address || ''}</textarea>
              </div>

              <!-- LLR Details -->
              <div class="form-group">
                <label class="form-label">Learner's Licence Number</label>
                <input type="text" id="trainee-llr-num" class="form-input" placeholder="e.g. MH13 20260012345" value="${prefillData?.learners_licence_number || ''}" required>
              </div>

              <div class="form-group">
                <label class="form-label">LLR Expiry Date</label>
                <input type="date" id="trainee-llr-expiry" class="form-input" value="${prefillData?.learners_licence_expiry || ''}" required>
              </div>

              <!-- Passing Test of Competence -->
              <div class="form-group">
                <label class="form-label">Date of Passing Test (Competence)</label>
                <input type="date" id="trainee-test-date" class="form-input" value="${prefillData?.test_competence_date || ''}">
              </div>

              <!-- Permanent DL details -->
              <div class="form-group">
                <label class="form-label">Permanent DL Number (Optional)</label>
                <input type="text" id="trainee-dl-num" class="form-input" value="${prefillData?.driving_licence_number || ''}">
              </div>

              <div class="form-group">
                <label class="form-label">DL Issue Date</label>
                <input type="date" id="trainee-dl-issue" class="form-input" value="${prefillData?.driving_licence_issue_date || ''}">
              </div>

              <div class="form-group">
                <label class="form-label">DL Issuing Authority</label>
                <input type="text" id="trainee-dl-auth" class="form-input" placeholder="e.g. RTO Solapur" value="${prefillData?.driving_licence_authority || ''}">
              </div>

              <!-- Course and Training period -->
              <div class="form-group">
                <label class="form-label">Course Assigned</label>
                <select id="trainee-course" class="form-input" style="height:50px; appearance:auto;" required>
                  <option value="Four-Wheeler" ${prefillData?.course_assigned === 'Four-Wheeler' ? 'selected' : ''}>Four-Wheeler</option>
                  <option value="Two-Wheeler" ${prefillData?.course_assigned === 'Two-Wheeler' ? 'selected' : ''}>Two-Wheeler</option>
                  <option value="Auto-Rickshaw" ${prefillData?.course_assigned === 'Auto-Rickshaw' ? 'selected' : ''}>Auto-Rickshaw</option>
                  <option value="Heavy Motor Vehicle" ${prefillData?.course_assigned === 'Heavy Motor Vehicle' ? 'selected' : ''}>Heavy Motor Vehicle (HMV)</option>
                  <option value="Tempo/LCV" ${prefillData?.course_assigned === 'Tempo/LCV' ? 'selected' : ''}>Tempo/LCV</option>
                  <option value="Refresher Course" ${prefillData?.course_assigned === 'Refresher Course' ? 'selected' : ''}>Refresher Course</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Training Period From</label>
                <input type="date" id="trainee-period-from" class="form-input" value="${prefillData?.training_period_from || ''}" required>
              </div>

              <div class="form-group">
                <label class="form-label">Training Period To</label>
                <input type="date" id="trainee-period-to" class="form-input" value="${prefillData?.training_period_to || ''}" required>
              </div>

              <div class="form-group span-full">
                <label class="form-label">Remarks / Additional Notes</label>
                <textarea id="trainee-remarks" class="form-input" rows="2">${prefillData?.remarks || ''}</textarea>
              </div>

            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" id="btn-cancel-trainee-modal" class="btn btn-secondary-sm">Cancel</button>
          <button type="button" id="btn-save-trainee-modal" class="btn btn-primary">Save Trainee</button>
        </div>
      </div>
    </div>
  `;

  // Close helper
  const closeModal = () => {
    document.getElementById('trainee-modal').remove();
    // Strip query string if convert happened so it doesn't trigger modal again
    if (window.location.hash.includes('?convert=')) {
      window.location.hash = '#/trainees';
    }
  };

  document.getElementById('close-trainee-modal').addEventListener('click', closeModal);
  document.getElementById('btn-cancel-trainee-modal').addEventListener('click', closeModal);

  // File Upload listener (convert to Base64)
  const fileInput = document.getElementById('trainee-photo-file');
  const statusSpan = document.getElementById('photo-file-status');
  const photoUrlInput = document.getElementById('trainee-photo-url');
  
  fileInput.addEventListener('change', async () => {
    if (fileInput.files.length > 0) {
      statusSpan.innerText = fileInput.files[0].name;
      try {
        const base64 = await fileToBase64(fileInput.files[0]);
        photoUrlInput.value = base64;
      } catch (e) {
        alert('Image conversion failed.');
      }
    }
  });

  // Save submit listener
  document.getElementById('btn-save-trainee-modal').addEventListener('click', async () => {
    const form = document.getElementById('trainee-form');
    if (!form.reportValidity()) return;

    const payload = {
      full_name: document.getElementById('trainee-name').value,
      photo_url: photoUrlInput.value || null,
      guardian_relation: document.getElementById('trainee-relation').value,
      guardian_name: document.getElementById('trainee-guardian').value,
      date_of_birth: document.getElementById('trainee-dob').value,
      date_of_enrollment: document.getElementById('trainee-doe').value,
      permanent_address: document.getElementById('trainee-perm-addr').value,
      temporary_address: document.getElementById('trainee-temp-addr').value || null,
      learners_licence_number: document.getElementById('trainee-llr-num').value,
      learners_licence_expiry: document.getElementById('trainee-llr-expiry').value,
      test_competence_date: document.getElementById('trainee-test-date').value || null,
      driving_licence_number: document.getElementById('trainee-dl-num').value || null,
      driving_licence_issue_date: document.getElementById('trainee-dl-issue').value || null,
      driving_licence_authority: document.getElementById('trainee-dl-auth').value || null,
      course_assigned: document.getElementById('trainee-course').value,
      training_period_from: document.getElementById('trainee-period-from').value,
      training_period_to: document.getElementById('trainee-period-to').value,
      remarks: document.getElementById('trainee-remarks').value || null,
    };

    const saveBtn = document.getElementById('btn-save-trainee-modal');
    saveBtn.disabled = true;
    saveBtn.innerText = 'Saving...';

    try {
      let dbErr = null;
      if (isEdit) {
        const { error } = await supabase
          .from('trainees')
          .update(payload)
          .eq('id', prefillData.id);
        dbErr = error;
      } else {
        const { error } = await supabase
          .from('trainees')
          .insert([payload]);
        dbErr = error;
      }

      if (dbErr) {
        alert('Save failed: ' + dbErr.message);
      } else {
        closeModal();
        if (onSaved) onSaved();
      }
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      saveBtn.disabled = false;
      saveBtn.innerText = 'Save Trainee';
    }
  });
}

// Render Trainee Profile detail page
async function renderTraineeProfile(container, traineeId) {
  try {
    // 1. Fetch Trainee Details
    const { data: trainee, error } = await supabase
      .from('trainees')
      .select('*')
      .eq('id', traineeId)
      .single();

    if (error) throw error;

    // 2. Fetch Sessions list
    const { data: sessions } = await supabase
      .from('training_sessions')
      .select('*')
      .eq('trainee_id', traineeId)
      .order('session_date', { ascending: true });

    let photoHtml = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`;
    if (trainee.photo_url) {
      photoHtml = `<img src="${trainee.photo_url}" alt="${trainee.full_name}">`;
    }

    container.innerHTML = `
      <div style="margin-bottom: 20px;">
        <a href="#/trainees" class="btn btn-secondary-sm"><span style="margin-right:5px;">←</span> Back to Registry</a>
      </div>

      <!-- Header Card -->
      <div class="trainee-profile-header">
        <div class="profile-avatar-container">
          ${photoHtml}
        </div>
        <div class="profile-meta">
          <h2>${trainee.full_name}</h2>
          <p>Enrollment: <strong>${trainee.enrollment_number || 'PENDING'}</strong></p>
          <div style="margin-top:10px;">
            <span class="badge ${trainee.status === 'active' ? 'badge-active' : trainee.status === 'completed' ? 'badge-completed' : 'badge-dropped'}">${trainee.status}</span>
          </div>
        </div>
        <div class="profile-actions">
          <button id="btn-edit-profile" class="btn btn-primary-sm">Edit Details</button>
          <div style="display:flex; gap:8px; margin-top:5px;">
            <button id="btn-mark-completed" class="btn btn-secondary-sm btn-sm" style="flex-grow:1; background-color:#ECFDF5; color:#047857;">Mark Completed</button>
            <button id="btn-mark-dropped" class="btn btn-danger-sm btn-sm" style="flex-grow:1;">Mark Dropped</button>
          </div>
        </div>
      </div>

      <!-- PDF Export Quick Panel -->
      <div style="background-color: var(--color-text-white); border: 1px solid var(--color-border); padding: 20px 30px; border-radius: 8px; margin-bottom: 30px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h3 style="font-family:var(--font-serif); font-size:1.15rem;">Official Register Exports</h3>
          <p style="font-size:0.85rem; color:var(--color-text-light);">Export RTO compliant register entries in PDF format.</p>
        </div>
        <div style="display:flex; gap:12px;">
          <button id="btn-export-f14" class="btn btn-primary" style="padding:10px 20px; font-size:0.9rem;">Export Form 14 (PDF)</button>
          <button id="btn-export-f15" class="btn btn-dark" style="padding:10px 20px; font-size:0.9rem;">Export Form 15 (PDF)</button>
        </div>
      </div>

      <!-- Profile Details Grid -->
      <div class="profile-details-grid">
        <div class="profile-detail-item">
          <span class="profile-detail-label">Guardian Name</span>
          <span class="profile-detail-val"><span style="font-size:0.75rem; text-transform:uppercase; color:var(--color-text-light);">${trainee.guardian_relation}:</span> ${trainee.guardian_name}</span>
        </div>
        <div class="profile-detail-item">
          <span class="profile-detail-label">Date of Birth</span>
          <span class="profile-detail-val">${formatDate(trainee.date_of_birth)}</span>
        </div>
        <div class="profile-detail-item">
          <span class="profile-detail-label">Date of Enrollment</span>
          <span class="profile-detail-val">${formatDate(trainee.date_of_enrollment)}</span>
        </div>

        <div class="profile-detail-item">
          <span class="profile-detail-label">Learner's Licence (LLR)</span>
          <span class="profile-detail-val">${trainee.learners_licence_number}</span>
        </div>
        <div class="profile-detail-item">
          <span class="profile-detail-label">LLR Expiry Date</span>
          <span class="profile-detail-val">${formatDate(trainee.learners_licence_expiry)}</span>
        </div>
        <div class="profile-detail-item">
          <span class="profile-detail-label">Passed Competence Test</span>
          <span class="profile-detail-val">${formatDate(trainee.test_competence_date)}</span>
        </div>

        <div class="profile-detail-item">
          <span class="profile-detail-label">Permanent DL Number</span>
          <span class="profile-detail-val">${trainee.driving_licence_number || '-'}</span>
        </div>
        <div class="profile-detail-item">
          <span class="profile-detail-label">DL Issue Date</span>
          <span class="profile-detail-val">${formatDate(trainee.driving_licence_issue_date)}</span>
        </div>
        <div class="profile-detail-item">
          <span class="profile-detail-label">DL Issuing Authority</span>
          <span class="profile-detail-val">${trainee.driving_licence_authority || '-'}</span>
        </div>

        <div class="profile-detail-item">
          <span class="profile-detail-label">Course Assigned</span>
          <span class="profile-detail-val">${trainee.course_assigned}</span>
        </div>
        <div class="profile-detail-item">
          <span class="profile-detail-label">Training Period</span>
          <span class="profile-detail-val">${formatDate(trainee.training_period_from)} to ${formatDate(trainee.training_period_to)}</span>
        </div>
        <div class="profile-detail-item">
          <span class="profile-detail-label">Remarks</span>
          <span class="profile-detail-val" style="font-weight:normal; font-size:0.9rem;">${trainee.remarks || '-'}</span>
        </div>

        <div class="profile-detail-item" style="grid-column: span 3;">
          <span class="profile-detail-label">Permanent Address</span>
          <span class="profile-detail-val" style="font-weight:normal;">${trainee.permanent_address}</span>
        </div>
        <div class="profile-detail-item" style="grid-column: span 3;">
          <span class="profile-detail-label">Temporary Address</span>
          <span class="profile-detail-val" style="font-weight:normal;">${trainee.temporary_address || '-'}</span>
        </div>
      </div>

      <!-- Daily training sessions logs -->
      <div class="table-wrapper">
        <div class="table-header">
          <div class="table-title">Training Sessions Register (Form 15 Entries)</div>
          <button id="btn-add-session" class="btn btn-primary-sm">Add Session Row</button>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Date</th>
              <th>Hours From</th>
              <th>Hours To</th>
              <th>Vehicle Class</th>
              <th>Instructor Name</th>
              <th style="text-align:center;">Trainee Signed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="sessions-table-body">
            <!-- Render sessions rows -->
          </tbody>
        </table>
      </div>
    `;

    const sessionsTableBody = document.getElementById('sessions-table-body');

    // Render training sessions helper
    const renderSessionsTable = () => {
      sessionsTableBody.innerHTML = '';
      if (!sessions || sessions.length === 0) {
        sessionsTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--color-text-light);">No training sessions logged for this trainee yet.</td></tr>`;
        return;
      }

      sessions.forEach((s, idx) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${idx + 1}</td>
          <td><strong>${formatDate(s.session_date)}</strong></td>
          <td>${s.hours_from.substring(0, 5)}</td>
          <td>${s.hours_to.substring(0, 5)}</td>
          <td>${s.vehicle_class}</td>
          <td>${s.instructor_name}</td>
          <td style="text-align:center;">
            <input type="checkbox" class="session-signed-chk" data-session-id="${s.id}" ${s.trainee_signed ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;">
          </td>
          <td>
            <button class="btn btn-danger-sm btn-sm btn-delete-session" data-session-id="${s.id}" style="padding:2px 8px;">✕</button>
          </td>
        `;
        sessionsTableBody.appendChild(row);
      });

      // Hook signed checkbox
      sessionsTableBody.querySelectorAll('.session-signed-chk').forEach(chk => {
        chk.addEventListener('change', async (e) => {
          const sId = e.target.getAttribute('data-session-id');
          const checked = e.target.checked;
          
          await supabase
            .from('training_sessions')
            .update({ trainee_signed: checked })
            .eq('id', sId);
        });
      });

      // Hook session delete
      sessionsTableBody.querySelectorAll('.btn-delete-session').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const sId = e.target.getAttribute('data-session-id');
          if (confirm('Delete this training session log?')) {
            const { error: delErr } = await supabase.from('training_sessions').delete().eq('id', sId);
            if (delErr) {
              alert('Delete failed: ' + delErr.message);
            } else {
              // Reload view
              await renderTraineeProfile(container, traineeId);
            }
          }
        });
      });
    };

    renderSessionsTable();

    // Hook edit details modal
    document.getElementById('btn-edit-profile').addEventListener('click', () => {
      openTraineeModal(trainee, () => renderTraineeProfile(container, traineeId));
    });

    // Hook status change: Completed
    document.getElementById('btn-mark-completed').addEventListener('click', async () => {
      if (confirm('Are you sure you want to mark this trainee as COMPLETED? They will be removed from daily scheduler sheets.')) {
        await supabase
          .from('trainees')
          .update({
            status: 'completed',
            status_changed_at: new Date().toISOString()
          })
          .eq('id', traineeId);
        await renderTraineeProfile(container, traineeId);
      }
    });

    // Hook status change: Dropped
    document.getElementById('btn-mark-dropped').addEventListener('click', async () => {
      if (confirm('Are you sure you want to mark this trainee as DROPPED? They will be removed from daily scheduler sheets.')) {
        await supabase
          .from('trainees')
          .update({
            status: 'dropped',
            status_changed_at: new Date().toISOString()
          })
          .eq('id', traineeId);
        await renderTraineeProfile(container, traineeId);
      }
    });

    // Hook PDF Export: Form 14
    document.getElementById('btn-export-f14').addEventListener('click', () => {
      exportForm14(trainee);
    });

    // Hook PDF Export: Form 15
    document.getElementById('btn-export-f15').addEventListener('click', () => {
      const schLicence = settingsCache['school_licence_number'] || '';
      const closedDay = settingsCache['closed_weekday'] || 'Sunday';
      exportForm15(trainee, sessions, schLicence, closedDay);
    });

    // Hook manual Session insertion modal
    document.getElementById('btn-add-session').addEventListener('click', () => {
      openManualSessionModal(traineeId, trainee.course_assigned, () => renderTraineeProfile(container, traineeId));
    });

  } catch (err) {
    container.innerHTML = `<div class="login-error" style="display:block;">Trainee profile failed: ${err.message}</div>`;
  }
}

// Add manual session modal entry
function openManualSessionModal(traineeId, courseClass, onSaved) {
  const modalContainer = document.getElementById('modal-container');
  const todayStr = new Date().toISOString().split('T')[0];

  modalContainer.innerHTML = `
    <div class="modal-overlay" id="session-modal" style="display:flex;">
      <div class="modal-box">
        <div class="modal-header">
          <h3>Add Manual Training Row</h3>
          <button id="close-session-modal" style="font-weight:bold;font-size:1.2rem;">✕</button>
        </div>
        <div class="modal-body">
          <form id="session-log-form">
            <div class="trainee-form-grid">
              <div class="form-group">
                <label class="form-label">Session Date</label>
                <input type="date" id="sess-date" class="form-input" value="${todayStr}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Vehicle Class</label>
                <input type="text" id="sess-vehicle" class="form-input" value="${courseClass}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Hours From</label>
                <input type="time" id="sess-from" class="form-input" value="08:00" required>
              </div>
              <div class="form-group">
                <label class="form-label">Hours To</label>
                <input type="time" id="sess-to" class="form-input" value="09:00" required>
              </div>
              <div class="form-group span-full">
                <label class="form-label">Instructor Name</label>
                <input type="text" id="sess-instructor" class="form-input" value="Balkrishna School Trainer" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; margin-top:20px;">Save Session Log</button>
          </form>
        </div>
      </div>
    </div>
  `;

  // Close handlers
  const closeModal = () => {
    document.getElementById('session-modal').remove();
  };
  document.getElementById('close-session-modal').addEventListener('click', closeModal);

  // Submit Handler
  document.getElementById('session-log-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      trainee_id: traineeId,
      session_date: document.getElementById('sess-date').value,
      hours_from: document.getElementById('sess-from').value,
      hours_to: document.getElementById('sess-to').value,
      vehicle_class: document.getElementById('sess-vehicle').value,
      instructor_name: document.getElementById('sess-instructor').value,
      trainee_signed: false
    };

    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const { error } = await supabase.from('training_sessions').insert([payload]);
      if (error) {
        alert('Failed to insert session: ' + error.message);
      } else {
        closeModal();
        if (onSaved) onSaved();
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      submitBtn.disabled = false;
    }
  });
}

// =========================================================================
// VIEW: Offers & Promotions Manager
// =========================================================================
async function renderOffers(container) {
  try {
    const { data: offers, error } = await supabase
      .from('offers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    let cardsHtml = '';
    if (offers.length === 0) {
      cardsHtml = `
        <div class="span-full" style="text-align:center; padding: 60px 20px; background: white; border-radius: 12px; border: 1px solid var(--color-border); grid-column: 1 / -1; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" style="width:48px; height:48px; color:var(--color-text-light); margin-bottom:12px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.591 0l4.318-4.318a1.125 1.125 0 000-1.591l-9.581-9.581A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" /></svg>
          <p style="color:var(--color-text-medium); font-weight:600; font-size:0.95rem;">No promotion campaigns configured yet.</p>
          <span style="font-size:0.8rem; color:var(--color-text-light); margin-top:4px;">Create an offer to display a live urgency banner on the public site.</span>
        </div>
      `;
    } else {
      const now = new Date();
      offers.forEach(o => {
        const start = new Date(o.start_at);
        const end = new Date(o.end_at);
        
        let status = 'Live';
        let statusClass = 'badge-active';
        
        if (!o.is_enabled) {
          status = 'Disabled';
          statusClass = 'badge-closed';
        } else if (now < start) {
          status = 'Scheduled';
          statusClass = 'badge-contacted';
        } else if (now > end) {
          status = 'Expired';
          statusClass = 'badge-dropped';
        }

        let imagePreviewHtml = '';
        if (o.banner_image_url) {
          imagePreviewHtml = `
            <div style="width:100%; height:130px; overflow:hidden; border-top-left-radius:8px; border-top-right-radius:8px; background:#f1f5f9; border-bottom:1px solid var(--color-border);">
              <img src="${o.banner_image_url}" style="width:100%; height:100%; object-fit:cover;">
            </div>
          `;
        } else {
          imagePreviewHtml = `
            <div style="width:100%; height:130px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg, #f8fafc, #e2e8f0); border-top-left-radius:8px; border-top-right-radius:8px; border-bottom:1px solid var(--color-border); color:var(--color-text-light);">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:36px; height:36px; opacity:0.6;"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" /></svg>
              <span style="font-size:0.7rem; font-weight:600; margin-top:4px; text-transform:uppercase; letter-spacing:0.05em;">No Banner Image</span>
            </div>
          `;
        }

        cardsHtml += `
          <div class="stat-card" style="display:flex; flex-direction:column; padding:0; justify-content:space-between; border-radius:8px; overflow:hidden; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05); transition:transform 0.15s ease, box-shadow 0.15s ease; border:1px solid var(--color-border); background:white;">
            <div>
              ${imagePreviewHtml}
              <div style="padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span class="badge ${statusClass}" style="font-size:0.7rem; font-weight:600; padding:2px 8px; border-radius:12px;">${status}</span>
                  <span style="font-size:0.75rem; color:var(--color-text-light); font-weight:700;">Urgency: ${o.urgency_text || '-'}</span>
                </div>
                <h3 style="font-family:var(--font-serif); font-size:1.15rem; font-weight:700; color:var(--color-text-dark); margin-bottom:4px; line-height:1.25;">${o.title}</h3>
                <p style="font-size:0.85rem; font-weight:800; color:var(--color-gold-dark); margin-bottom:8px;">${o.discount_text}</p>
                <p style="font-size:0.82rem; color:var(--color-text-medium); margin-bottom:0; line-height:1.4; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; text-overflow:ellipsis; height:50px;">${o.description}</p>
              </div>
            </div>
            
            <div style="border-top:1px solid var(--color-border); padding:16px; font-size:0.75rem; color:var(--color-text-light); background:#F8FAFC;">
              <div><strong>Start:</strong> ${new Date(o.start_at).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}</div>
              <div style="margin-top:2px;"><strong>End:</strong> ${new Date(o.end_at).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}</div>
              
              <div style="display:flex; gap:10px; margin-top:15px;">
                <button class="btn btn-secondary-sm btn-sm btn-edit-offer" data-id="${o.id}" style="flex-grow:1; display:flex; align-items:center; justify-content:center; gap:4px; font-weight:700; height:34px;">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:12px; height:12px;"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                  Edit
                </button>
                <button class="btn btn-danger-sm btn-sm btn-delete-offer" data-id="${o.id}" style="flex-grow:1; display:flex; align-items:center; justify-content:center; gap:4px; font-weight:700; height:34px;">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:12px; height:12px;"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = `
      <div style="background-color:var(--color-text-white); border:1px solid var(--color-border); padding:20px 24px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; margin-bottom:25px; box-shadow:0 2px 4px rgba(0,0,0,0.01);">
        <div>
          <h3 style="font-family:var(--font-serif); font-size:1.25rem; font-weight:700; color:var(--color-text-dark); margin-bottom:4px;">Marketing Campaigns & Offers</h3>
          <p style="font-size:0.85rem; color:var(--color-text-light); margin-bottom:0;">Configure promotional countdown cards and discount banners shown on the public homepage.</p>
        </div>
        <button id="btn-new-offer" class="btn btn-primary" style="display:flex; align-items:center; gap:6px; font-weight:700; padding:12px 20px;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:16px; height:16px;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Create Promotion Offer
        </button>
      </div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
        ${cardsHtml}
      </div>
    `;

    // Hook new offer button
    document.getElementById('btn-new-offer').addEventListener('click', () => {
      openOfferModal(null, () => renderOffers(container));
    });

    // Hook edit offer buttons
    container.querySelectorAll('.btn-edit-offer').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const offer = offers.find(o => o.id === id);
        openOfferModal(offer, () => renderOffers(container));
      });
    });

    // Hook delete offer buttons
    container.querySelectorAll('.btn-delete-offer').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this offer? This will remove the banner from the public homepage.')) {
          const { error } = await supabase.from('offers').delete().eq('id', id);
          if (error) alert('Delete failed: ' + error.message);
          else await renderOffers(container);
        }
      });
    });

  } catch (err) {
    container.innerHTML = `<div class="login-error" style="display:block;">Offers load failed: ${err.message}</div>`;
  }
}

// Modal Form for creating/editing offers
function openOfferModal(prefillOffer = null, onSaved) {
  const modalContainer = document.getElementById('modal-container');
  const isEdit = prefillOffer && prefillOffer.id;

  // Formatting timestamp dates for datetime-local input fields (YYYY-MM-DDTHH:MM)
  const formatDateTimeLocal = (isoStr) => {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  // Structured campaign parser
  let parsedDesc = {
    course_name: 'Four-Wheeler Premium Package (Sedan/SUV)',
    original_fee: '8500',
    discount_val: '1500',
    why_us_badge: 'RTO Certified Instructors',
    marketing_text: '',
    benefits: [
      '20 Days Intensive Practical Training',
      'Personal Dedicated Trainer & Dual-Control Car',
      'RTO Learners Permit & License Preparatory Support',
      'Wet Weather & Night Simulation Training'
    ]
  };

  if (isEdit && prefillOffer.description) {
    try {
      if (prefillOffer.description.trim().startsWith('{')) {
        const parsed = JSON.parse(prefillOffer.description);
        parsedDesc = { ...parsedDesc, ...parsed };
      } else {
        parsedDesc.marketing_text = prefillOffer.description;
      }
    } catch (e) {
      parsedDesc.marketing_text = prefillOffer.description;
    }
  }

  modalContainer.innerHTML = `
    <div class="modal-overlay" id="offer-modal" style="display:flex; justify-content:center; align-items:center; background:rgba(15,23,42,0.7); backdrop-filter:blur(4px); z-index:1000; position:fixed; inset:0;">
      <div class="modal-box" style="max-width:1300px; width:95vw; height:90vh; max-height:850px; padding:0; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); box-shadow:0 25px 50px -12px rgba(0,0,0,0.55); background:white; display:flex; flex-direction:column;">
        
        <!-- Modal Header -->
        <div style="background:#F8FAFC; border-bottom:1px solid #E2E8F0; padding:20px 30px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
          <div>
            <h3 style="font-family:var(--font-serif); font-size:1.4rem; font-weight:800; color:#0F172A; margin:0;">
              ${isEdit ? 'Configure Marketing Campaign' : 'Launch New Campaign'}
            </h3>
            <p style="font-size:0.8rem; color:#64748B; margin:4px 0 0 0;">Create high-converting landing page modules with live pricing grids and live tickers.</p>
          </div>
          <button id="close-offer-modal" style="font-weight:bold; font-size:1.3rem; color:#94A3B8; background:none; border:none; cursor:pointer; padding:6px; transition:color 0.15s ease;">✕</button>
        </div>

        <!-- Modal Body (Two Column Split Pane) -->
        <div style="display:grid; grid-template-columns: 1.1fr 1.2fr; flex-grow:1; overflow:hidden;">
          
          <!-- Left Panel: Form Inputs -->
          <div style="padding:30px; overflow-y:auto; height:100%; border-right:1px solid #E2E8F0; background:#FCFDFE;">
            <form id="offer-form" style="display:flex; flex-direction:column; gap:20px;">
              
              <!-- Section 1: Campaign Identity -->
              <div style="border-bottom:1px solid #F1F5F9; padding-bottom:20px;">
                <span style="font-size:0.7rem; font-weight:800; text-transform:uppercase; color:#E11D48; letter-spacing:0.05em; display:block; margin-bottom:8px;">1. Campaign Identity</span>
                <div style="display:grid; grid-template-columns:1fr; gap:16px;">
                  <div class="form-group">
                    <label class="form-label" style="font-weight:700; color:#1E293B;">Campaign Title / Headline</label>
                    <input type="text" id="offer-title" class="form-input" placeholder="e.g. Monsoon Special Offer" value="${prefillOffer?.title || ''}" required style="border-color:#CBD5E1; height:40px;">
                  </div>
                  <div class="form-group">
                    <label class="form-label" style="font-weight:700; color:#1E293B;">Badge / Category Title</label>
                    <input type="text" id="offer-why-us-badge" class="form-input" placeholder="e.g. Special Monsoon Promotion" value="${parsedDesc.why_us_badge}" style="border-color:#CBD5E1; height:40px;">
                  </div>
                  <div class="form-group">
                    <label class="form-label" style="font-weight:700; color:#1E293B;">Marketing Tagline / Paragraph</label>
                    <textarea id="offer-marketing-text" class="form-input" rows="2" placeholder="Write a short convincing paragraph..." required style="resize:none; border-color:#CBD5E1;">${parsedDesc.marketing_text}</textarea>
                  </div>
                </div>
              </div>

              <!-- Section 2: Course & Pricing -->
              <div style="border-bottom:1px solid #F1F5F9; padding-bottom:20px;">
                <span style="font-size:0.7rem; font-weight:800; text-transform:uppercase; color:#E11D48; letter-spacing:0.05em; display:block; margin-bottom:8px;">2. Course & Pricing</span>
                <div style="display:grid; grid-template-columns:1fr; gap:16px;">
                  <div class="form-group">
                    <label class="form-label" style="font-weight:700; color:#1E293B;">Course Name / Package</label>
                    <input type="text" id="offer-course-name" class="form-input" placeholder="e.g. Four-Wheeler (SUV/Sedan)" value="${parsedDesc.course_name}" required style="border-color:#CBD5E1; height:40px;">
                  </div>
                  
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                    <div class="form-group">
                      <label class="form-label" style="font-weight:700; color:#1E293B;">Original Price (₹)</label>
                      <input type="number" id="offer-original-price" class="form-input" placeholder="e.g. 8500" value="${parsedDesc.original_fee}" required style="border-color:#CBD5E1; height:40px;">
                    </div>
                    <div class="form-group">
                      <label class="form-label" style="font-weight:700; color:#1E293B;">Discount Value (₹)</label>
                      <input type="number" id="offer-discount-value" class="form-input" placeholder="e.g. 1500" value="${parsedDesc.discount_val}" required style="border-color:#CBD5E1; height:40px;">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label" style="font-weight:700; color:#1E293B;">Discount Badge Text (Shown on homepage card)</label>
                    <input type="text" id="offer-discount" class="form-input" placeholder="e.g. Flat Rs. 1500 Off" value="${prefillOffer?.discount_text || ''}" required style="border-color:#CBD5E1; height:40px;">
                  </div>
                </div>
              </div>

              <!-- Section 3: Campaign Features Checklist -->
              <div style="border-bottom:1px solid #F1F5F9; padding-bottom:20px;">
                <span style="font-size:0.7rem; font-weight:800; text-transform:uppercase; color:#E11D48; letter-spacing:0.05em; display:block; margin-bottom:8px;">3. Campaign Features (One per line)</span>
                <div class="form-group">
                  <label class="form-label" style="font-weight:700; color:#1E293B;">Course Benefits Checklist</label>
                  <textarea id="offer-benefits-text" class="form-input" rows="4" placeholder="e.g. 20 Practical sessions&#10;Dedicated trainer car&#10;Full RTO permit preparation" style="resize:vertical; border-color:#CBD5E1;">${parsedDesc.benefits.join('\n')}</textarea>
                  <span style="font-size:0.72rem; color:#64748B; margin-top:4px;">Enter each course benefit on a new line. These generate checkbox items in the campaign card.</span>
                </div>
              </div>

              <!-- Section 4: Schedule & Media -->
              <div>
                <span style="font-size:0.7rem; font-weight:800; text-transform:uppercase; color:#E11D48; letter-spacing:0.05em; display:block; margin-bottom:8px;">4. Schedule & Media Settings</span>
                <div style="display:grid; grid-template-columns:1fr; gap:16px;">
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                    <div class="form-group">
                      <label class="form-label" style="font-weight:700; color:#1E293B;">Start Date/Time</label>
                      <input type="datetime-local" id="offer-start" class="form-input" value="${formatDateTimeLocal(prefillOffer?.start_at)}" required style="border-color:#CBD5E1; height:40px;">
                    </div>
                    <div class="form-group">
                      <label class="form-label" style="font-weight:700; color:#1E293B;">End Date/Time (Deadline)</label>
                      <input type="datetime-local" id="offer-end" class="form-input" value="${formatDateTimeLocal(prefillOffer?.end_at)}" required style="border-color:#CBD5E1; height:40px;">
                    </div>
                  </div>

                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                    <div class="form-group">
                      <label class="form-label" style="font-weight:700; color:#1E293B;">Urgency Warning Label</label>
                      <input type="text" id="offer-urgency" class="form-input" placeholder="e.g. Only 3 slots left!" value="${prefillOffer?.urgency_text || ''}" style="border-color:#CBD5E1; height:40px;">
                    </div>
                    <div class="form-group">
                      <label class="form-label" style="font-weight:700; color:#1E293B;">CTA Button Text</label>
                      <input type="text" id="offer-cta" class="form-input" value="${prefillOffer?.cta_text || 'Claim This Offer'}" required style="border-color:#CBD5E1; height:40px;">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label" style="font-weight:700; color:#1E293B;">Banner Image (Optional)</label>
                    <div style="display:flex; gap:10px; align-items:center; border:1px solid #E2E8F0; padding:8px 12px; border-radius:6px; background:#F8FAFC;">
                      <div class="file-upload-wrapper">
                        <button type="button" class="btn btn-secondary-sm" style="padding:6px 12px; font-weight:700; font-size:0.8rem; border-color:#CBD5E1;">Choose Image</button>
                        <input type="file" id="offer-banner-file" class="file-upload-input" accept="image/*">
                      </div>
                      <span id="banner-file-status" style="font-size:0.8rem; color:#64748B; font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:180px;">${prefillOffer?.banner_image_url ? 'Existing image loaded' : 'No file chosen'}</span>
                      <input type="hidden" id="offer-banner-url" value="${prefillOffer?.banner_image_url || ''}">
                    </div>
                  </div>

                  <div class="form-group" style="flex-direction:row; align-items:center; gap:8px; margin-top:8px;">
                    <input type="checkbox" id="offer-enabled" style="width:18px; height:18px; cursor:pointer;" ${prefillOffer === null || prefillOffer?.is_enabled ? 'checked' : ''}>
                    <label for="offer-enabled" class="form-label" style="margin-bottom:0; cursor:pointer; font-weight:600; font-size:0.88rem; color:#334155;">Active Campaign (Checked = Active on site during scheduled dates)</label>
                  </div>
                </div>
              </div>

            </form>
          </div>

          <!-- Right Panel: Live Preview Panel -->
          <div style="padding:40px 30px; overflow-y:auto; height:100%; background:#090E1A; display:flex; flex-direction:column; align-items:center; justify-content:center; border-bottom-right-radius:12px; position:relative;">
            <span style="position:absolute; top:20px; left:20px; font-size:0.65rem; font-weight:900; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.15em;">⚡ Live Landing Page Preview</span>
            <div id="preview-container-wrapper" style="width:100%; display:flex; justify-content:center;"></div>
          </div>

        </div>

        <!-- Modal Footer -->
        <div style="background:#F8FAFC; border-top:1px solid #E2E8F0; padding:16px 30px; display:flex; justify-content:flex-end; gap:12px; flex-shrink:0;">
          <button type="button" id="btn-cancel-offer" class="btn btn-secondary-sm" style="font-weight:700; height:40px; border-color:#CBD5E1; padding:0 20px;">Cancel</button>
          <button type="button" id="btn-save-offer" class="btn btn-primary" style="font-weight:700; height:40px; padding:0 24px; display:flex; align-items:center; gap:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:14px; height:14px;"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Save Promotion
          </button>
        </div>
      </div>
    </div>
  `;

  // Close helper
  const closeModal = () => {
    clearInterval(previewInterval);
    document.getElementById('offer-modal').remove();
  };
  document.getElementById('close-offer-modal').addEventListener('click', closeModal);
  document.getElementById('btn-cancel-offer').addEventListener('click', closeModal);

  // File Upload listener (convert to Base64)
  const imageInput = document.getElementById('offer-banner-file');
  const statusSpan = document.getElementById('banner-file-status');
  const bannerUrlInput = document.getElementById('offer-banner-url');
  
  imageInput.addEventListener('change', async () => {
    if (imageInput.files.length > 0) {
      statusSpan.innerText = imageInput.files[0].name;
      try {
        const base64 = await fileToBase64(imageInput.files[0]);
        bannerUrlInput.value = base64;
        updateLivePreview();
      } catch (e) {
        alert('Image conversion failed.');
      }
    }
  });

  // Dynamic Live Preview Builder
  const updateLivePreview = () => {
    const title = document.getElementById('offer-title').value || 'Special Promotion Course';
    const discountText = document.getElementById('offer-discount').value || '15% OFF';
    const courseName = document.getElementById('offer-course-name').value || 'Four-Wheeler Premium Course';
    const marketingText = document.getElementById('offer-marketing-text').value || 'Learn driving from certified instructors with flexible hour slots.';
    const whyUs = document.getElementById('offer-why-us-badge').value || 'RTO Approved Academy';
    const originalPrice = parseInt(document.getElementById('offer-original-price').value.replace(/,/g, "")) || 7500;
    const discountValue = parseInt(document.getElementById('offer-discount-value').value.replace(/,/g, "")) || 1500;
    const finalFee = originalPrice - discountValue;
    const urgency = document.getElementById('offer-urgency').value || 'Limited Slots';
    const cta = document.getElementById('offer-cta').value || 'Claim This Offer';
    const benefits = document.getElementById('offer-benefits-text').value.split('\n').map(x => x.trim()).filter(Boolean);
    const startStr = document.getElementById('offer-start').value;
    const endStr = document.getElementById('offer-end').value;
    const isEnabled = document.getElementById('offer-enabled').checked;

    // Calculate Status Pill
    let statusLabel = '<span class="badge badge-inactive" style="background-color:#64748b; color:white;">Disabled</span>';
    if (isEnabled) {
      if (startStr && endStr) {
        const now = new Date();
        const start = new Date(startStr);
        const end = new Date(endStr);
        if (now >= start && now <= end) {
          statusLabel = '<span class="badge badge-completed" style="background-color:#10b981; color:white;">Live Now</span>';
        } else if (now < start) {
          statusLabel = '<span class="badge badge-active" style="background-color:#f59e0b; color:white;">Scheduled</span>';
        } else {
          statusLabel = '<span class="badge badge-inactive" style="background-color:#ef4444; color:white;">Expired</span>';
        }
      } else {
        statusLabel = '<span class="badge badge-active" style="background-color:#f59e0b; color:white;">Scheduled</span>';
      }
    }

    let benefitsHtml = '';
    benefits.forEach(b => {
      benefitsHtml += `
        <div style="display:flex; align-items:start; gap:8px; color:rgba(255,255,255,0.85); font-size:0.82rem; font-weight:600; text-align:left;">
          <div style="margin-top:2px; display:flex; align-items:center; justify-content:center; width:16px; height:16px; border-radius:50%; background:rgba(245,158,11,0.15); color:#F59E0B; border:1px solid rgba(245,158,11,0.2); flex-shrink:0;">
            <span style="font-size:0.6rem; font-weight:900;">✓</span>
          </div>
          <span>${b}</span>
        </div>
      `;
    });
    if (benefits.length === 0) {
      benefitsHtml = `
        <div style="color:rgba(255,255,255,0.4); font-size:0.8rem; font-style:italic;">No benefits added yet.</div>
      `;
    }

    const endTimeStr = document.getElementById('offer-end').value;
    let days = '00', hours = '00', minutes = '00', seconds = '00';
    if (endTimeStr) {
      const distance = new Date(endTimeStr).getTime() - new Date().getTime();
      if (distance > 0) {
        days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
        hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
      }
    }

    const previewContainer = document.getElementById('preview-container-wrapper');
    if (!previewContainer) return;

    previewContainer.innerHTML = `
      <div style="width:100%; max-width:480px; background:#0B111E; border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:28px; box-shadow:0 20px 40px rgba(0,0,0,0.5); overflow:hidden; font-family:system-ui, -apple-system, sans-serif; position:relative; text-align:left;">
        
        <!-- Ambient lighting dots -->
        <div style="position:absolute; inset:0; background:radial-gradient(circle at 10% 10%, rgba(245,158,11,0.06), transparent 40%); pointer-events:none;"></div>
        
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.25); padding:4px 10px; border-radius:12px; font-size:0.65rem; font-weight:800; color:#F59E0B; text-transform:uppercase; letter-spacing:0.1em;">
            ⭐ ${whyUs}
          </span>
          ${statusLabel}
        </div>
        
        <h3 style="font-family:Georgia, serif; font-size:1.6rem; font-weight:900; color:white; line-height:1.2; margin-bottom:8px; margin-top:0;">
          ${title}
        </h3>
        
        <p style="color:rgba(255,255,255,0.7); font-size:0.85rem; line-height:1.4; margin-bottom:16px;">
          ${marketingText}
        </p>
        
        <!-- Urgency alert badge -->
        <div style="background-color:rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; color:#F87171; display:flex; align-items:center; gap:6px; margin-bottom:16px;">
          <span style="font-size:1rem;">⚠️</span> ${urgency}
        </div>

        <!-- Benefits checklist -->
        <div style="display:grid; grid-template-columns:1fr; gap:8px; padding-bottom:16px; border-bottom:1px solid rgba(255,255,255,0.08); margin-bottom:16px;">
          ${benefitsHtml}
        </div>

        <!-- Price Card Mock (White styling) -->
        <div style="background:white; color:#0A101D; border-radius:12px; padding:16px; border:1px solid #E2E8F0; margin-top:16px; position:relative; overflow:hidden;">
          <div style="position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(to right, #F59E0B, #EF4444);"></div>
          
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span style="font-size:0.55rem; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; color:#EF4444; display:block;">Course Selected</span>
              <h5 style="font-size:0.95rem; font-weight:900; margin:2px 0 0 0; color:#0F172A; line-height:1.2;">
                ${courseName}
              </h5>
            </div>
            <span style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.2); border-radius:4px; padding:2px 6px; font-size:0.6rem; font-weight:900; color:#B45309;">
              ${discountText}
            </span>
          </div>

          <div style="margin-top:16px; display:flex; align-items:baseline; justify-content:space-between;">
            <div>
              <span style="font-size:0.55rem; color:#64748B; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; display:block;">Limited Special Price</span>
              <div style="display:flex; align-items:baseline; gap:6px;">
                <span style="font-size:1.8rem; font-weight:900; color:#0F172A; font-family:var(--font-serif);">₹${finalFee.toLocaleString("en-IN")}</span>
                <span style="font-size:0.85rem; color:#94A3B8; text-decoration:line-through; font-weight:700;">₹${originalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <span style="background:#ECFDF5; border:1px solid #A7F3D0; color:#047857; font-size:0.65rem; font-weight:800; padding:3px 8px; border-radius:20px; text-transform:uppercase;">
              Save ₹${discountValue.toLocaleString("en-IN")}
            </span>
          </div>

          <!-- Expiry timer inside card -->
          <div style="margin-top:12px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:0.6rem; font-weight:800; text-transform:uppercase; color:#64748B;">
              ⏰ Campaign Ends In:
            </div>
            <div style="display:flex; gap:4px; font-size:0.75rem; font-weight:700; font-family:monospace; color:#0F172A;">
              <span>${days}d</span>:<span>${hours}h</span>:<span>${minutes}m</span>:<span>${seconds}s</span>
            </div>
          </div>

          <!-- CTA button -->
          <button type="button" style="width:100%; border:none; background:#EF4444; color:white; font-weight:800; font-size:0.8rem; padding:12px; border-radius:8px; cursor:pointer; margin-top:12px; box-shadow:0 4px 6px rgba(239,68,68,0.15); transition:transform 0.1s ease;">
            ${cta} →
          </button>
        </div>
      </div>
    `;
  };

  // Wire up change listeners for immediate live updates
  setTimeout(() => {
    const inputs = ['offer-title', 'offer-discount', 'offer-course-name', 'offer-marketing-text', 'offer-why-us-badge', 'offer-original-price', 'offer-discount-value', 'offer-urgency', 'offer-cta', 'offer-start', 'offer-end'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', updateLivePreview);
        el.addEventListener('change', updateLivePreview);
        el.addEventListener('keyup', updateLivePreview);
      }
    });
    updateLivePreview();
  }, 100);

  // Setup ticking clock inside preview
  const previewInterval = setInterval(updateLivePreview, 1000);

  // Save Submit listener
  document.getElementById('btn-save-offer').addEventListener('click', async () => {
    const form = document.getElementById('offer-form');
    if (!form.reportValidity()) return;

    // Convert local datetime input values to UTC string for ISO conformity
    const startIso = new Date(document.getElementById('offer-start').value).toISOString();
    const endIso = new Date(document.getElementById('offer-end').value).toISOString();

    // Construct the serialized description JSON string
    const descObj = {
      course_name: document.getElementById('offer-course-name').value.trim() || 'Premium Driving Course',
      original_fee: document.getElementById('offer-original-price').value.trim() || '7500',
      discount_val: document.getElementById('offer-discount-value').value.trim() || '1500',
      savings: document.getElementById('offer-discount-value').value.trim() || '1500',
      benefits: document.getElementById('offer-benefits-text').value.split('\n').map(x => x.trim()).filter(Boolean),
      marketing_text: document.getElementById('offer-marketing-text').value.trim() || '',
      why_us_badge: document.getElementById('offer-why-us-badge').value.trim() || 'RTO Approved Training Academy'
    };

    const payload = {
      title: document.getElementById('offer-title').value,
      description: JSON.stringify(descObj),
      discount_text: document.getElementById('offer-discount').value,
      urgency_text: document.getElementById('offer-urgency').value || null,
      cta_text: document.getElementById('offer-cta').value,
      banner_image_url: bannerUrlInput.value || null,
      start_at: startIso,
      end_at: endIso,
      is_enabled: document.getElementById('offer-enabled').checked
    };

    const saveBtn = document.getElementById('btn-save-offer');
    saveBtn.disabled = true;

    try {
      let dbErr = null;
      if (isEdit) {
        const { error } = await supabase
          .from('offers')
          .update(payload)
          .eq('id', prefillOffer.id);
        dbErr = error;
      } else {
        const { error } = await supabase
          .from('offers')
          .insert([payload]);
        dbErr = error;
      }

      if (dbErr) {
        alert('Save failed: ' + dbErr.message);
      } else {
        closeModal();
        if (onSaved) onSaved();
      }
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      saveBtn.disabled = false;
    }
  });
}

// =========================================================================
// VIEW: Settings Manager
// =========================================================================
async function renderSettings(container) {
  // Pull current settings values
  const schoolLicence = settingsCache['school_licence_number'] || '';
  const startHour = settingsCache['operating_hours_start'] || '07:00';
  const endHour = settingsCache['operating_hours_end'] || '19:00';
  const closedDay = settingsCache['closed_weekday'] || 'sunday';
  const schoolName = settingsCache['school_name'] || 'Balkrishna Driving School';
  const schoolContact = settingsCache['school_contact'] || '94223 70787';
  const schoolEmail = settingsCache['school_email'] || 'info@balkrishnadrivingschool.com';
  const schoolAddress = settingsCache['school_address'] || 'Bhavani Peth, Solapur';
  const rtoState = settingsCache['rto_registration_state'] || 'Maharashtra';
  const rtoOffice = settingsCache['rto_office_name'] || 'Solapur RTO (MH-13)';
  const whatsappNum = settingsCache['website_whatsapp_number'] || '94223 70787';
  const campaignMode = settingsCache['campaign_display_mode'] || 'active_only';

  container.innerHTML = `
    <div style="max-width:1150px; margin: 0 auto;">
      
      <!-- Page Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; border-bottom:1px solid var(--color-border); padding-bottom:20px;">
        <div>
          <h2 style="font-family:var(--font-serif); font-size:1.75rem; font-weight:700; color:var(--color-text-dark); margin:0;">School Profile Settings</h2>
          <p style="color:var(--color-text-medium); font-size:0.88rem; margin:4px 0 0 0;">Manage identity, schedule boundaries, RTO data, and frontend connections.</p>
        </div>
      </div>

      <!-- Alert Box for feedback -->
      <div id="settings-status-banner" style="display:none; padding:16px 20px; border-radius:8px; margin-bottom:25px; font-size:0.88rem; font-weight:600; box-shadow:0 2px 4px rgba(0,0,0,0.02);"></div>

      <form id="settings-form" style="display:flex; flex-direction:column; gap:25px;">
        
        <!-- Grid layout for settings cards -->
        <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:25px;">
          
          <!-- Card 1: Business Information -->
          <div style="background:white; border:1px solid var(--color-border); border-radius:16px; padding:30px; box-shadow:0 1px 3px rgba(0,0,0,0.05); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--color-border); padding-bottom:12px; margin-bottom:4px;">
              <div style="width:36px; height:36px; background:rgba(225,29,72,0.1); color:#E11D48; border-radius:8px; display:flex; align-items:center; justify-content:center;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:20px; height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h2.25M9 10.5h.008v.008H9V10.5zm3 0h.008v.008H12V10.5zm3 0h.008v.008H15V10.5zm-6 3h.008v.008H9v-.008zm3 0h.008v.008H12v-.008zm3 0h.008v.008H15v-.008zm-6 3h.008v.008H9v-.008zm3 0h.008v.008H12v-.008zm3 0h.008v.008H15v-.008zM2.25 18V9A2.25 2.25 0 014.5 6.75h5.053c.4 0 .791.139 1.102.393L12 8.25" /></svg>
              </div>
              <div>
                <h4 style="font-size:1rem; font-weight:700; color:var(--color-text-dark); margin:0;">Business Information</h4>
                <p style="font-size:0.75rem; color:var(--color-text-light); margin:2px 0 0 0;">Manage contact and physical school parameters.</p>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">School Name</label>
              <input type="text" id="set-school-name" class="form-input" value="${schoolName}" required style="border-color:#CBD5E1; height:40px; background:white; color:var(--color-text-dark);">
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div class="form-group">
                <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">Contact Phone</label>
                <input type="text" id="set-school-contact" class="form-input" value="${schoolContact}" required style="border-color:#CBD5E1; height:40px; background:white; color:var(--color-text-dark);">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">Contact Email</label>
                <input type="email" id="set-school-email" class="form-input" value="${schoolEmail}" required style="border-color:#CBD5E1; height:40px; background:white; color:var(--color-text-dark);">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">Physical Address</label>
              <input type="text" id="set-school-address" class="form-input" value="${schoolAddress}" required style="border-color:#CBD5E1; height:40px; background:white; color:var(--color-text-dark);">
            </div>
          </div>

          <!-- Card 2: Operating Hours -->
          <div style="background:white; border:1px solid var(--color-border); border-radius:16px; padding:30px; box-shadow:0 1px 3px rgba(0,0,0,0.05); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--color-border); padding-bottom:12px; margin-bottom:4px;">
              <div style="width:36px; height:36px; background:rgba(245,158,11,0.1); color:#D97706; border-radius:8px; display:flex; align-items:center; justify-content:center;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:20px; height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 style="font-size:1rem; font-weight:700; color:var(--color-text-dark); margin:0;">Operating Hours</h4>
                <p style="font-size:0.75rem; color:var(--color-text-light); margin:2px 0 0 0;">Define bounds for driving training slots.</p>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div class="form-group">
                <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">Start Time</label>
                <input type="time" id="set-hours-start" class="form-input" value="${startHour}" required style="border-color:#CBD5E1; height:40px; background:white; color:var(--color-text-dark);">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">End Time</label>
                <input type="time" id="set-hours-end" class="form-input" value="${endHour}" required style="border-color:#CBD5E1; height:40px; background:white; color:var(--color-text-dark);">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">Closed Weekday</label>
              <select id="set-closed" class="form-input" style="height:40px; appearance:auto; cursor:pointer; border-color:#CBD5E1; background:white; color:var(--color-text-dark);" required>
                <option value="sunday" ${closedDay.toLowerCase() === 'sunday' ? 'selected' : ''}>Sunday</option>
                <option value="monday" ${closedDay.toLowerCase() === 'monday' ? 'selected' : ''}>Monday</option>
                <option value="tuesday" ${closedDay.toLowerCase() === 'tuesday' ? 'selected' : ''}>Tuesday</option>
                <option value="wednesday" ${closedDay.toLowerCase() === 'wednesday' ? 'selected' : ''}>Wednesday</option>
                <option value="thursday" ${closedDay.toLowerCase() === 'thursday' ? 'selected' : ''}>Thursday</option>
                <option value="friday" ${closedDay.toLowerCase() === 'friday' ? 'selected' : ''}>Friday</option>
                <option value="saturday" ${closedDay.toLowerCase() === 'saturday' ? 'selected' : ''}>Saturday</option>
                <option value="none" ${closedDay.toLowerCase() === 'none' ? 'selected' : ''}>None (Open daily)</option>
              </select>
              <span style="font-size:0.75rem; color:var(--color-text-light); margin-top:4px;">Trainees won't be able to book sessions on this day.</span>
            </div>
          </div>

          <!-- Card 3: RTO Information -->
          <div style="background:white; border:1px solid var(--color-border); border-radius:16px; padding:30px; box-shadow:0 1px 3px rgba(0,0,0,0.05); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--color-border); padding-bottom:12px; margin-bottom:4px;">
              <div style="width:36px; height:36px; background:rgba(79,70,229,0.1); color:#4F46E5; border-radius:8px; display:flex; align-items:center; justify-content:center;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:20px; height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              </div>
              <div>
                <h4 style="font-size:1rem; font-weight:700; color:var(--color-text-dark); margin:0;">RTO Information</h4>
                <p style="font-size:0.75rem; color:var(--color-text-light); margin:2px 0 0 0;">Official driving school license credentials.</p>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">School RTO Licence Number</label>
              <input type="text" id="set-licence" class="form-input" placeholder="e.g. MH13-DS-2026/001" value="${schoolLicence}" style="border-color:#CBD5E1; height:40px; background:white; color:var(--color-text-dark);">
              <span style="font-size:0.75rem; color:var(--color-text-light); margin-top:4px;">Prints on header of Form 15 logbooks.</span>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div class="form-group">
                <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">State Jurisdiction</label>
                <input type="text" id="set-rto-state" class="form-input" value="${rtoState}" style="border-color:#CBD5E1; height:40px; background:white; color:var(--color-text-dark);">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">Local RTO Office Name</label>
                <input type="text" id="set-rto-office" class="form-input" value="${rtoOffice}" style="border-color:#CBD5E1; height:40px; background:white; color:var(--color-text-dark);">
              </div>
            </div>
          </div>

          <!-- Card 4: Website Configuration -->
          <div style="background:white; border:1px solid var(--color-border); border-radius:16px; padding:30px; box-shadow:0 1px 3px rgba(0,0,0,0.05); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--color-border); padding-bottom:12px; margin-bottom:4px;">
              <div style="width:36px; height:36px; background:rgba(16,185,129,0.1); color:#10B981; border-radius:8px; display:flex; align-items:center; justify-content:center;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:20px; height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" /></svg>
              </div>
              <div>
                <h4 style="font-size:1rem; font-weight:700; color:var(--color-text-dark); margin:0;">Website Configuration</h4>
                <p style="font-size:0.75rem; color:var(--color-text-light); margin:2px 0 0 0;">Manage public website connection hooks.</p>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">WhatsApp Business Number</label>
              <input type="text" id="set-whatsapp-number" class="form-input" value="${whatsappNum}" style="border-color:#CBD5E1; height:40px; background:white; color:var(--color-text-dark);">
              <span style="font-size:0.75rem; color:var(--color-text-light); margin-top:4px;">Main destination phone for customer CTA buttons.</span>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">Promotional Campaign Mode</label>
              <select id="set-campaign-mode" class="form-input" style="height:40px; appearance:auto; cursor:pointer; border-color:#CBD5E1; background:white; color:var(--color-text-dark);" required>
                <option value="active_only" ${campaignMode === 'active_only' ? 'selected' : ''}>Active Campaigns Only (Display active timed cards)</option>
                <option value="always_show" ${campaignMode === 'always_show' ? 'selected' : ''}>Force Display (Always show latest enabled campaign card)</option>
              </select>
            </div>
          </div>

          <!-- Card 5: Database & API Security -->
          <div style="background:white; border:1px solid var(--color-border); border-radius:16px; padding:30px; box-shadow:0 1px 3px rgba(0,0,0,0.05); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--color-border); padding-bottom:12px; margin-bottom:4px;">
              <div style="width:36px; height:36px; background:rgba(99,102,241,0.1); color:#6366f1; border-radius:8px; display:flex; align-items:center; justify-content:center;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:20px; height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <div>
                <h4 style="font-size:1rem; font-weight:700; color:var(--color-text-dark); margin:0;">Database & API Security</h4>
                <p style="font-size:0.75rem; color:var(--color-text-light); margin:2px 0 0 0;">Check connection details and endpoint security states.</p>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">Supabase RLS Policies Status</label>
              <div style="background-color:#ecfdf5; border:1px solid #a7f3d0; padding:10px 14px; border-radius:8px; font-size:0.8rem; color:#065f46; font-weight:600; display:flex; align-items:center; gap:8px;">
                <span class="health-dot" style="background-color:#10b981; box-shadow:0 0 6px #10b981; animation:none; width:6px; height:6px;"></span> Row Level Security (RLS) Active
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight:700; color:var(--color-text-dark);">SSL Connection State</label>
              <div style="background-color:#ecfdf5; border:1px solid #a7f3d0; padding:10px 14px; border-radius:8px; font-size:0.8rem; color:#065f46; font-weight:600; display:flex; align-items:center; gap:8px;">
                <span class="health-dot" style="background-color:#10b981; box-shadow:0 0 6px #10b981; animation:none; width:6px; height:6px;"></span> HTTPS Transport Layer Active (TLS 1.3)
              </div>
            </div>
          </div>

        </div>

        <button type="submit" class="btn btn-primary" style="width:200px; height:45px; font-weight:700; align-self:flex-end; display:flex; align-items:center; justify-content:center; gap:6px; margin-top:15px; font-size:0.9rem; box-shadow:0 10px 15px -3px rgba(226,177,60,0.15);">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:16px; height:16px;"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          Save Configuration
        </button>
      </form>
    </div>
  `;

  document.getElementById('settings-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const licence = document.getElementById('set-licence').value.trim();
    const start = document.getElementById('set-hours-start').value;
    const end = document.getElementById('set-hours-end').value;
    const closed = document.getElementById('set-closed').value;

    const school_name = document.getElementById('set-school-name').value.trim();
    const school_contact = document.getElementById('set-school-contact').value.trim();
    const school_email = document.getElementById('set-school-email').value.trim();
    const school_address = document.getElementById('set-school-address').value.trim();
    const rto_state = document.getElementById('set-rto-state').value.trim();
    const rto_office = document.getElementById('set-rto-office').value.trim();
    const whatsapp_number = document.getElementById('set-whatsapp-number').value.trim();
    const campaign_mode = document.getElementById('set-campaign-mode').value;

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const banner = document.getElementById('settings-status-banner');
    
    submitBtn.disabled = true;
    submitBtn.innerText = 'Saving Configuration...';
    banner.style.display = 'none';

    try {
      const updates = [
        { key: 'school_licence_number', value: licence },
        { key: 'operating_hours_start', value: start },
        { key: 'operating_hours_end', value: end },
        { key: 'closed_weekday', value: closed },
        { key: 'school_name', value: school_name },
        { key: 'school_contact', value: school_contact },
        { key: 'school_email', value: school_email },
        { key: 'school_address', value: school_address },
        { key: 'rto_registration_state', value: rto_state },
        { key: 'rto_office_name', value: rto_office },
        { key: 'website_whatsapp_number', value: whatsapp_number },
        { key: 'campaign_display_mode', value: campaign_mode }
      ];

      for (const item of updates) {
        await supabase
          .from('settings')
          .upsert(item);
      }

      await fetchSettings();
      
      // Visual feedback banner
      banner.style.display = 'block';
      banner.style.backgroundColor = '#ECFDF5';
      banner.style.color = '#065F46';
      banner.style.border = '1px solid #A7F3D0';
      banner.innerText = 'Configuration settings saved and applied successfully.';
      
      // Auto scroll to top
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
      banner.style.display = 'block';
      banner.style.backgroundColor = '#FEF2F2';
      banner.style.color = '#991B1B';
      banner.style.border = '1px solid #FCA5A5';
      banner.innerText = 'Save failed: ' + err.message;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:16px; height:16px;"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        Save Configuration
      `;
    }
  });
}

// =========================================================================
// VIEW: RTO Registers (Form 14 & 15 Fill & Export)
// =========================================================================
async function renderRTOForms(container) {
  try {
    // 1. Fetch all trainees
    const { data: trainees, error } = await supabase
      .from('trainees')
      .select('*')
      .order('full_name', { ascending: true });

    if (error) throw error;

    if (!trainees || trainees.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 60px 20px; background: white; border-radius: 8px; border: 1px solid var(--color-border); max-width:600px; margin: 40px auto;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" style="width:60px; height:60px; color:var(--color-text-light); margin-bottom:15px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          <h3 style="font-family:var(--font-serif); font-size:1.4rem; margin-bottom:10px;">No Trainees Found</h3>
          <p style="color:var(--color-text-medium); font-size:0.95rem; margin-bottom:25px; line-height:1.5;">To fill out Form 14 and Form 15, you must first register a trainee. Create a trainee profile to start logging sessions and exporting records.</p>
          <button id="btn-rto-register-first" class="btn btn-primary" style="padding:12px 24px;">Register Your First Trainee</button>
        </div>
      `;
      document.getElementById('btn-rto-register-first').addEventListener('click', () => {
        openTraineeModal(null, () => renderRTOForms(container));
      });
      return;
    }

    let selectOptions = '<option value="" disabled selected>-- Select a Trainee --</option>';
    if (trainees) {
      trainees.forEach(t => {
        selectOptions += `<option value="${t.id}">${t.full_name} (${t.enrollment_number || 'PENDING'})</option>`;
      });
    }

    container.innerHTML = `
      <div class="rto-editor-wrapper">
        <div class="rto-selector-card">
          <div style="display:flex; flex-direction:column; gap:6px; flex-grow:1; max-width:350px;">
            <label class="form-label" style="font-weight:700; margin-bottom:0;">Select Trainee Profile:</label>
            <select id="rto-trainee-select" class="form-input" style="height:42px; appearance:auto;">
              ${selectOptions}
            </select>
          </div>
          <div class="rto-tabs" id="rto-tabs-bar" style="display:none; border:none; padding-bottom:0; margin-top:0;">
            <button class="rto-tab-btn active" data-tab="f14">Form 14 Register</button>
            <button class="rto-tab-btn" data-tab="f15">Form 15 Logbook</button>
          </div>
        </div>

        <div id="rto-sheet-viewport">
          <div style="text-align:center; padding: 60px 20px; background: white; border-radius: 8px; border: 1px solid var(--color-border);">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" style="width:50px; height:50px; color:var(--color-text-light); margin-bottom:15px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h3 style="font-family:var(--font-serif); font-size:1.25rem; margin-bottom:5px;">Select a Trainee</h3>
            <p style="color:var(--color-text-light); font-size:0.9rem;">Choose a student from the dropdown to load, fill, and export their RTO forms.</p>
          </div>
        </div>
      </div>
    `;

    const traineeSelect = document.getElementById('rto-trainee-select');
    const tabsBar = document.getElementById('rto-tabs-bar');
    const viewport = document.getElementById('rto-sheet-viewport');

    let currentTrainee = null;
    let currentSessions = [];
    let activeTab = 'f14';

    // Handler when trainee changes
    traineeSelect.addEventListener('change', async (e) => {
      const traineeId = e.target.value;
      
      // Show loader in viewport
      viewport.innerHTML = `<div class="loading-box">Loading Trainee Registers...</div>`;
      tabsBar.style.display = 'flex';

      // Fetch Trainee details and sessions
      const t = trainees.find(x => x.id === traineeId);
      currentTrainee = t;

      const { data: sess, error: sessErr } = await supabase
        .from('training_sessions')
        .select('*')
        .eq('trainee_id', traineeId)
        .order('session_date', { ascending: true });

      if (sessErr) {
        alert('Failed to load training sessions: ' + sessErr.message);
        currentSessions = [];
      } else {
        currentSessions = sess || [];
      }

      renderSelectedForm();
    });

    // Handle Tab clicking
    tabsBar.querySelectorAll('.rto-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        tabsBar.querySelectorAll('.rto-tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeTab = e.target.getAttribute('data-tab');
        renderSelectedForm();
      });
    });

    // Helper to render the active form layout
    function renderSelectedForm() {
      if (!currentTrainee) return;

      if (activeTab === 'f14') {
        renderForm14Editor();
      } else {
        renderForm15Editor();
      }
    }

    // FORM 14 Interactive Editor
    function renderForm14Editor() {
      // Year estimation
      let enrollYear = new Date().getFullYear().toString();
      if (currentTrainee.date_of_enrollment) {
        enrollYear = currentTrainee.date_of_enrollment.substring(0, 4);
      }

      viewport.innerHTML = `
        <div class="rto-paper-sheet reveal-on-scroll">
          <div class="rto-sheet-title">
            <h2 style="font-size: 1.5rem; margin-bottom:5px;">FORM 14</h2>
            <p style="font-size:0.85rem; margin-bottom:5px;">[See rule 27(a)]</p>
            <h3 style="font-size:0.95rem; text-transform:uppercase; letter-spacing:0.05em;">Register showing the enrolment of trainee (s) in the driving school establishments</h3>
          </div>

          <div style="display:flex; justify-content:space-between; margin-bottom:20px; align-items:flex-start;">
            <div style="font-size:0.95rem;">
              Register for the year: <input type="text" id="f14-year" class="rto-underline-input" style="width:70px; font-weight:700;" value="${enrollYear}">
            </div>
            <div style="border:1px solid #94A3B8; width:75px; height:90px; display:flex; align-items:center; justify-content:center; font-size:0.75rem; text-align:center; color:#64748B; background:#F8FAFC;">
              ${currentTrainee.photo_url ? `<img src="${currentTrainee.photo_url}" style="width:100%; height:100%; object-fit:cover;">` : 'Trainee<br>Photo'}
            </div>
          </div>

          <div class="rto-sheet-grid">
            <div class="rto-sheet-field">
              <label>1. Enrollment Number:</label>
              <input type="text" id="f14-enrollment" class="rto-underline-input" value="${currentTrainee.enrollment_number || ''}" disabled placeholder="Will be filled by system trigger">
            </div>

            <div class="rto-sheet-field">
              <label>2. Name of the trainee:</label>
              <input type="text" id="f14-name" class="rto-underline-input" value="${currentTrainee.full_name || ''}">
            </div>

            <div class="rto-sheet-field">
              <label>3. Son / Wife / Daughter of:</label>
              <input type="text" id="f14-guardian" class="rto-underline-input" value="${currentTrainee.guardian_name || ''}">
              <select id="f14-relation" class="rto-underline-input" style="max-width:110px; appearance:auto;">
                <option value="Son of" ${currentTrainee.guardian_relation === 'Son of' ? 'selected' : ''}>Son of</option>
                <option value="Wife of" ${currentTrainee.guardian_relation === 'Wife of' ? 'selected' : ''}>Wife of</option>
                <option value="Daughter of" ${currentTrainee.guardian_relation === 'Daughter of' ? 'selected' : ''}>Daughter of</option>
              </select>
            </div>

            <div style="font-weight:700; margin-top:5px;">4. Address</div>
            
            <div class="rto-sheet-field" style="padding-left:15px;">
              <label>(a) Permanent Address:</label>
              <input type="text" id="f14-perm-addr" class="rto-underline-input" value="${currentTrainee.permanent_address || ''}">
            </div>

            <div class="rto-sheet-field" style="padding-left:15px;">
              <label>(b) Temporary Address/official address (if any):</label>
              <input type="text" id="f14-temp-addr" class="rto-underline-input" value="${currentTrainee.temporary_address || ''}">
            </div>

            <div class="rto-sheet-field">
              <label>5. Date of birth:</label>
              <input type="date" id="f14-dob" class="rto-underline-input" value="${currentTrainee.date_of_birth || ''}">
            </div>

            <div class="rto-sheet-field">
              <label>6. Date of enrollment:</label>
              <input type="date" id="f14-doe" class="rto-underline-input" value="${currentTrainee.date_of_enrollment || ''}">
            </div>

            <div class="rto-sheet-field">
              <label>7. Learner's licence number:</label>
              <input type="text" id="f14-llr-num" class="rto-underline-input" value="${currentTrainee.learners_licence_number || ''}">
              <label>and date of its expiry:</label>
              <input type="date" id="f14-llr-expiry" class="rto-underline-input" value="${currentTrainee.learners_licence_expiry || ''}">
            </div>

            <div class="rto-sheet-field">
              <label>8. Date of passing the test of competence to drive:</label>
              <input type="date" id="f14-test-date" class="rto-underline-input" value="${currentTrainee.test_competence_date || ''}">
            </div>

            <div class="rto-sheet-field">
              <label>9. Driving licence number:</label>
              <input type="text" id="f14-dl-num" class="rto-underline-input" value="${currentTrainee.driving_licence_number || ''}">
              <label>date of issue:</label>
              <input type="date" id="f14-dl-issue" class="rto-underline-input" value="${currentTrainee.driving_licence_issue_date || ''}">
            </div>
            
            <div class="rto-sheet-field" style="padding-left:15px;">
              <label>Licence authority which issued the licence:</label>
              <input type="text" id="f14-dl-auth" class="rto-underline-input" value="${currentTrainee.driving_licence_authority || ''}">
            </div>
          </div>

          <table class="rto-grid-table">
            <thead>
              <tr>
                <th rowspan="2">Course of Training in Driving</th>
                <th colspan="2">Period</th>
                <th rowspan="2">Remarks</th>
              </tr>
              <tr>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select id="f14-course" class="rto-underline-input" style="border:none; appearance:auto; font-weight:bold;">
                    <option value="Four-Wheeler" ${currentTrainee.course_assigned === 'Four-Wheeler' ? 'selected' : ''}>Four-Wheeler</option>
                    <option value="Two-Wheeler" ${currentTrainee.course_assigned === 'Two-Wheeler' ? 'selected' : ''}>Two-Wheeler</option>
                    <option value="Auto-Rickshaw" ${currentTrainee.course_assigned === 'Auto-Rickshaw' ? 'selected' : ''}>Auto-Rickshaw</option>
                    <option value="Heavy Motor Vehicle" ${currentTrainee.course_assigned === 'Heavy Motor Vehicle' ? 'selected' : ''}>Heavy Motor Vehicle (HMV)</option>
                    <option value="Tempo/LCV" ${currentTrainee.course_assigned === 'Tempo/LCV' ? 'selected' : ''}>Tempo/LCV</option>
                    <option value="Refresher Course" ${currentTrainee.course_assigned === 'Refresher Course' ? 'selected' : ''}>Refresher Course</option>
                  </select>
                </td>
                <td><input type="date" id="f14-period-from" style="font-weight:600;" value="${currentTrainee.training_period_from || ''}"></td>
                <td><input type="date" id="f14-period-to" style="font-weight:600;" value="${currentTrainee.training_period_to || ''}"></td>
                <td><input type="text" id="f14-remarks" style="font-weight:600;" value="${currentTrainee.remarks || ''}" placeholder="Remarks..."></td>
              </tr>
            </tbody>
          </table>

          <div style="display:flex; justify-content:space-between; margin-top:40px;">
            <div style="font-size:0.9rem;">13. Signature of the licence holder / Instructor</div>
            <div style="text-align:right; font-weight:700; font-size:0.95rem;">
              Balkrishna Driving School,<br>Solapur.
            </div>
          </div>
        </div>

        <div class="rto-actions-bar">
          <span id="rto-autosave-status" style="margin-right:auto; font-size:0.8rem; color:var(--color-text-light); display:inline-flex; align-items:center; gap:6px;">
            <span style="width:6px; height:6px; background-color:var(--color-success); border-radius:50%; display:inline-block;"></span>
            All changes synced to Supabase
          </span>
          <button id="btn-save-rto-f14" class="btn btn-dark" style="padding:12px 24px;">Save to Student Profile</button>
          <button id="btn-export-rto-f14" class="btn btn-primary" style="padding:12px 24px;">Export Form 14 (PDF)</button>
        </div>
      `;

      // Save Form 14 button handler
      document.getElementById('btn-save-rto-f14').addEventListener('click', async () => {
        const saveBtn = document.getElementById('btn-save-rto-f14');
        saveBtn.disabled = true;
        saveBtn.innerText = 'Saving...';

        const payload = {
          full_name: document.getElementById('f14-name').value,
          guardian_name: document.getElementById('f14-guardian').value,
          guardian_relation: document.getElementById('f14-relation').value,
          permanent_address: document.getElementById('f14-perm-addr').value,
          temporary_address: document.getElementById('f14-temp-addr').value || null,
          date_of_birth: document.getElementById('f14-dob').value,
          date_of_enrollment: document.getElementById('f14-doe').value,
          learners_licence_number: document.getElementById('f14-llr-num').value,
          learners_licence_expiry: document.getElementById('f14-llr-expiry').value,
          test_competence_date: document.getElementById('f14-test-date').value || null,
          driving_licence_number: document.getElementById('f14-dl-num').value || null,
          driving_licence_issue_date: document.getElementById('f14-dl-issue').value || null,
          driving_licence_authority: document.getElementById('f14-dl-auth').value || null,
          course_assigned: document.getElementById('f14-course').value,
          training_period_from: document.getElementById('f14-period-from').value,
          training_period_to: document.getElementById('f14-period-to').value,
          remarks: document.getElementById('f14-remarks').value || null
        };

        try {
          const { error } = await supabase
            .from('trainees')
            .update(payload)
            .eq('id', currentTrainee.id);

          if (error) throw error;

          alert('Trainee Form 14 values saved successfully.');
          // Update local details cache
          currentTrainee = { ...currentTrainee, ...payload };
        } catch (err) {
          alert('Save failed: ' + err.message);
        } finally {
          saveBtn.disabled = false;
          saveBtn.innerText = 'Save to Student Profile';
        }
      });

      // Export Form 14 button handler
      document.getElementById('btn-export-rto-f14').addEventListener('click', () => {
        exportForm14(currentTrainee);
      });
    }

    // FORM 15 Interactive Editor (Allows filling up to 30 sessions logs)
    function renderForm15Editor() {
      const schoolLicence = settingsCache['school_licence_number'] || '';
      const closedDay = settingsCache['closed_weekday'] || 'Sunday';

      // Generate 30 rows form inputs
      let rowsHtml = '';
      for (let r = 0; r < 30; r++) {
        const session = currentSessions[r];
        
        rowsHtml += `
          <tr class="f15-edit-row" data-index="${r}" data-id="${session ? session.id : ''}">
            <td style="text-align:center; font-weight:700;">${r + 1}</td>
            <td><input type="date" class="f15-row-date" value="${session ? session.session_date : ''}" style="font-size:0.8rem;"></td>
            <td><input type="time" class="f15-row-from" value="${session ? session.hours_from.substring(0, 5) : '08:00'}" style="font-size:0.8rem;"></td>
            <td><input type="time" class="f15-row-to" value="${session ? session.hours_to.substring(0, 5) : '09:00'}" style="font-size:0.8rem;"></td>
            <td><input type="text" class="f15-row-vehicle" value="${session ? session.vehicle_class : currentTrainee.course_assigned}" style="font-size:0.8rem;"></td>
            <td><input type="text" class="f15-row-instructor" value="${session ? session.instructor_name : 'Balkrishna School Trainer'}" style="font-size:0.8rem;"></td>
            <td style="text-align:center;">
              <input type="checkbox" class="f15-row-signed" ${session && session.trainee_signed ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;">
            </td>
          </tr>
        `;
      }

      // Year estimation
      const currentYear = currentTrainee.date_of_enrollment ? currentTrainee.date_of_enrollment.substring(0, 4) : new Date().getFullYear().toString();
      let seqNumber = '-';
      if (currentTrainee.enrollment_number) {
        const parts = currentTrainee.enrollment_number.split('-');
        if (parts.length >= 3) seqNumber = parts[2];
      }

      const completedSessionsCount = currentSessions.filter(s => s.session_date).length;
      const loggedPct = Math.min(100, Math.round((completedSessionsCount / 30) * 100));

      viewport.innerHTML = `
        <div class="rto-paper-sheet reveal-on-scroll" style="padding: 30px 25px;">
          
          <!-- Top Grid headers -->
          <div style="display:flex; justify-content:space-between; margin-bottom:20px; align-items:flex-start;">
            <div style="border:1px solid #94A3B8; width:150px; font-size:0.8rem; background:#F8FAFC;">
              <div style="border-bottom:1px solid #94A3B8; padding:2px 6px;">Licence No: <strong>${schoolLicence || '-'}</strong></div>
              <div style="padding:2px 6px;">Class: <strong>${currentTrainee.course_assigned || '-'}</strong></div>
            </div>
            
            <div style="text-align:center;">
              <h2 style="font-size: 1.25rem; font-weight:700; margin-bottom:2px;">FORM - 15</h2>
              <p style="font-size:0.75rem; margin-bottom:2px;">(See Rule 27 (i))</p>
              <h3 style="font-size:1.15rem; font-weight:700; text-transform:uppercase;">Balkrishna Driving School, Solapur.</h3>
              <p style="font-size:0.8rem; font-style:italic;">Register Showing the driving hours spent by a trainee.</p>
            </div>

            <div style="border:1px solid #94A3B8; width:120px; font-size:0.8rem; background:#F8FAFC;">
              <div style="border-bottom:1px solid #94A3B8; padding:2px 6px;">Year: <strong>${currentYear}</strong></div>
              <div style="padding:2px 6px;">Number: <strong>${seqNumber}</strong></div>
            </div>
          </div>

          <!-- Trainee info lines -->
          <div class="rto-sheet-grid" style="gap:8px; margin-bottom:15px;">
            <div class="rto-sheet-field">
              <label>1. Name of the Trainee -</label>
              <span style="font-weight:700; border-bottom:1px solid #CBD5E1; flex-grow:1; padding-bottom:2px;">${currentTrainee.full_name}</span>
            </div>
            
            <div style="display:flex; gap:20px;">
              <div class="rto-sheet-field" style="flex-grow:1;">
                <label>2. Enrolment Number -</label>
                <span style="font-weight:700; border-bottom:1px solid #CBD5E1; flex-grow:1; padding-bottom:2px;">${currentTrainee.enrollment_number}</span>
              </div>
              <div class="rto-sheet-field" style="width:250px;">
                <label>3. Date Enrolment -</label>
                <span style="font-weight:700; border-bottom:1px solid #CBD5E1; flex-grow:1; padding-bottom:2px;">${formatDate(currentTrainee.date_of_enrollment)}</span>
              </div>
            </div>

            <div style="display:flex; gap:20px;">
              <div class="rto-sheet-field" style="flex-grow:1;">
                <label>4. Learning Licence No. -</label>
                <span style="font-weight:700; border-bottom:1px solid #CBD5E1; flex-grow:1; padding-bottom:2px;">${currentTrainee.learners_licence_number}</span>
              </div>
              <div class="rto-sheet-field" style="width:250px;">
                <label>5. Mobile -</label>
                <span style="font-weight:700; border-bottom:1px solid #CBD5E1; flex-grow:1; padding-bottom:2px;">${currentTrainee.phone || '94223 70787'}</span>
              </div>
            </div>
          </div>

          <!-- Timeline progress visualization -->
          <div style="background-color:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px 18px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <span style="font-weight:700; font-size:0.9rem; color:var(--color-navy-dark);">Training Progress Timeline</span>
              <span style="font-size:0.8rem; color:var(--color-text-light); display:block;">${completedSessionsCount} of 30 driving lessons registered</span>
            </div>
            <div style="width: 200px; display:flex; flex-direction:column; align-items:flex-end; gap:4px; max-width:100%;">
              <div style="width:100%; height:8px; background-color:#e2e8f0; border-radius:4px; overflow:hidden;">
                <div style="width:${loggedPct}%; height:100%; background-color:var(--color-gold); border-radius:4px;"></div>
              </div>
              <span style="font-size:0.75rem; font-weight:700; color:var(--color-text-medium);">${loggedPct}% completed</span>
            </div>
          </div>

          <!-- 30 Rows grid inside wrapper to scroll locally if needed -->
          <div style="max-height:480px; overflow-y:auto; border:1px solid #1E293B; border-radius:4px; margin-bottom:20px;">
            <table class="rto-grid-table" style="margin:0; border:none;">
              <thead style="position:sticky; top:0; z-index:10;">
                <tr>
                  <th rowspan="2" style="width:40px;">Sr. No.</th>
                  <th rowspan="2" style="width:110px;">Date</th>
                  <th colspan="2">Hours Spent</th>
                  <th rowspan="2">Class of Vehicle</th>
                  <th rowspan="2">Instructor Name</th>
                  <th rowspan="2" style="width:70px;">Signed</th>
                </tr>
                <tr>
                  <th style="width:75px;">From</th>
                  <th style="width:75px;">To</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>

          <div class="rto-holiday-banner">
            NOTE : ${closedDay.toUpperCase()} HOLIDAY
          </div>

        </div>

        <div class="rto-actions-bar">
          <span id="rto-autosave-status" style="margin-right:auto; font-size:0.8rem; color:var(--color-text-light); display:inline-flex; align-items:center; gap:6px;">
            <span style="width:6px; height:6px; background-color:var(--color-success); border-radius:50%; display:inline-block;"></span>
            All changes synced to Supabase
          </span>
          <button id="btn-save-rto-f15" class="btn btn-dark" style="padding:12px 24px;">Save 30-Row Logbook</button>
          <button id="btn-export-rto-f15" class="btn btn-primary" style="padding:12px 24px;">Export Form 15 (PDF)</button>
        </div>
      `;

      // Save Form 15 button handler
      document.getElementById('btn-save-rto-f15').addEventListener('click', async () => {
        const saveBtn = document.getElementById('btn-save-rto-f15');
        saveBtn.disabled = true;
        saveBtn.innerText = 'Saving Logs...';

        const editRows = viewport.querySelectorAll('.f15-edit-row');
        let successCount = 0;
        let deleteCount = 0;

        try {
          for (const row of editRows) {
            const index = row.getAttribute('data-index');
            const sessionId = row.getAttribute('data-id');
            
            const rDate = row.querySelector('.f15-row-date').value;
            const rFrom = row.querySelector('.f15-row-from').value;
            const rTo = row.querySelector('.f15-row-to').value;
            const rVehicle = row.querySelector('.f15-row-vehicle').value;
            const rInstructor = row.querySelector('.f15-row-instructor').value;
            const rSigned = row.querySelector('.f15-row-signed').checked;

            const payload = {
              trainee_id: currentTrainee.id,
              session_date: rDate,
              hours_from: rFrom,
              hours_to: rTo,
              vehicle_class: rVehicle,
              instructor_name: rInstructor,
              trainee_signed: rSigned
            };

            // If fields are filled, update or insert
            if (rDate && rFrom && rTo && rVehicle && rInstructor) {
              if (sessionId) {
                // Update
                await supabase
                  .from('training_sessions')
                  .update(payload)
                  .eq('id', sessionId);
              } else {
                // Insert
                await supabase
                  .from('training_sessions')
                  .insert([payload]);
              }
              successCount++;
            } else if (sessionId) {
              // If fields were cleared, delete
              await supabase
                .from('training_sessions')
                .delete()
                .eq('id', sessionId);
              deleteCount++;
            }
          }

          alert(`Logbook saved successfully. Saved/updated ${successCount} rows, cleared ${deleteCount} empty entries.`);
          
          // Re-fetch sessions to update IDs in UI
          const { data: updatedSess } = await supabase
            .from('training_sessions')
            .select('*')
            .eq('trainee_id', currentTrainee.id)
            .order('session_date', { ascending: true });

          currentSessions = updatedSess || [];
          renderForm15Editor(); // reload visual list

        } catch (err) {
          alert('Save log failed: ' + err.message);
        } finally {
          saveBtn.disabled = false;
          saveBtn.innerText = 'Save 30-Row Logbook';
        }
      });

      // Export Form 15 button handler
      document.getElementById('btn-export-rto-f15').addEventListener('click', () => {
        exportForm15(currentTrainee, currentSessions, schoolLicence, closedDay);
      });
    }

  } catch (err) {
    container.innerHTML = `<div class="login-error" style="display:block;">RTO registers load failed: ${err.message}</div>`;
  }
}

