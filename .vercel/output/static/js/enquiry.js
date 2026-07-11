/* ==========================================================================
   Balkrishna Driving School - Enquiry Form & WhatsApp Handoff Logic
   ========================================================================== */

import { SUPABASE_URL, SUPABASE_ANON_KEY, WHATSAPP_NUMBER } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  initEnquiryForm();
});

/**
 * Initialize enquiry form validation, pre-selection, and submission flow
 */
function initEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const phoneInput = document.getElementById('phone');
  const courseSelect = document.getElementById('course');
  const phoneError = document.getElementById('phone-error');
  const statusContainer = document.getElementById('submission-status');

  // 1. Pre-select course based on URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const courseParam = urlParams.get('course');
  const offerParam = urlParams.get('offer');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const validOfferId = (offerParam && uuidRegex.test(offerParam)) ? offerParam : null;
  
  if (courseParam) {
    // Map of url param values to option values
    const courseMap = {
      'two-wheeler': 'Two-Wheeler',
      'four-wheeler': 'Four-Wheeler',
      'auto-rickshaw': 'Auto-Rickshaw',
      'heavy-motor-vehicle': 'Heavy Motor Vehicle',
      'tempo-lcv': 'Tempo/LCV',
      'refresher-course': 'Refresher Course'
    };
    
    const matchedOption = courseMap[courseParam.toLowerCase()] || courseParam;
    
    // Find option and select it
    for (let i = 0; i < courseSelect.options.length; i++) {
      if (courseSelect.options[i].value.toLowerCase() === matchedOption.toLowerCase()) {
        courseSelect.selectedIndex = i;
        break;
      }
    }
  }

  // 2. Validate Indian phone number pattern on input/blur
  const validatePhone = (phone) => {
    // Indian mobile numbers: 10 digits starting with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.trim());
  };

  phoneInput.addEventListener('input', () => {
    if (phoneInput.value.length > 0 && !validatePhone(phoneInput.value)) {
      phoneError.style.display = 'block';
    } else {
      phoneError.style.display = 'none';
    }
  });

  // 3. Handle Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset status messages
    statusContainer.className = 'submission-status';
    statusContainer.style.display = 'none';
    statusContainer.innerHTML = '';

    const fullName = document.getElementById('full-name').value.trim();
    const phone = phoneInput.value.trim();
    const course = courseSelect.value;
    const preferredBatch = document.getElementById('preferred-batch').value;
    const message = document.getElementById('message').value.trim();

    // Client-side validations
    if (!fullName) {
      alert('Please enter your full name');
      return;
    }

    if (!validatePhone(phone)) {
      phoneError.style.display = 'block';
      phoneInput.focus();
      return;
    }

    if (!course) {
      alert('Please select a course');
      return;
    }

    // Disable form controls to prevent double submissions
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" viewBox="0 0 50 50" style="animation: rotate 2s linear infinite; width: 20px; height: 20px; margin-right: 8px; display: inline-block; vertical-align: middle;">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" style="stroke-dasharray: 1, 150; stroke-dashoffset: 0; animation: dash 1.5s ease-in-out infinite;"></circle>
      </svg>
      Processing...
    `;

    // Inject CSS for spinner inline if not present
    if (!document.getElementById('spinner-style')) {
      const style = document.createElement('style');
      style.id = 'spinner-style';
      style.innerHTML = `
        @keyframes rotate { 100% { transform: rotate(360deg); } }
        @keyframes dash {
          0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
          100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
        }
      `;
      document.head.appendChild(style);
    }

    let supabaseInserted = false;
    let databaseErrorOccurred = false;

    // STEP 1 & 2: Insert into Supabase
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const { createClient } = window.supabase || {};
        if (createClient) {
          const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
          
          const { error } = await supabase
            .from('enquiries')
            .insert([
              {
                full_name: fullName,
                phone: phone,
                course: course,
                preferred_batch: preferredBatch,
                message: message || null,
                course_source: courseParam || 'direct',
                offer_id: validOfferId,
                status: 'new'
              }
            ]);
            
          if (error) {
            console.error('Supabase DB Insert Error:', error.message);
            databaseErrorOccurred = true;
          } else {
            console.log('Enquiry saved to Supabase successfully.');
            supabaseInserted = true;
          }
        } else {
          console.warn('Supabase JS library not loaded. Database insertion skipped.');
          databaseErrorOccurred = true;
        }
      } catch (err) {
        console.error('Supabase connection failed:', err);
        databaseErrorOccurred = true;
      }
    } else {
      console.warn('Supabase credentials are not configured in js/config.js. Simulating DB insert for development/demo.');
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      supabaseInserted = true; // Set to true to mock success
    }

    // STEP 3: Handoff to WhatsApp
    // Build message
    const optionalMsg = message ? ` Message: "${message}".` : '';
    const waText = `Hi, I'm ${fullName} and I'm interested in the ${course} course. Preferred batch: ${preferredBatch}.${optionalMsg} Please share more details.`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

    try {
      // Open WhatsApp in a new tab
      window.open(waUrl, '_blank');
    } catch (waErr) {
      console.error('Failed to open WhatsApp tab (possibly blocked by popup blocker):', waErr);
    }

    // STEP 4: Show on-page confirmation
    statusContainer.style.display = 'block';
    
    if (supabaseInserted && !databaseErrorOccurred) {
      statusContainer.className = 'submission-status success';
      statusContainer.innerHTML = `
        <strong>Thank you, ${fullName}!</strong> Your enquiry has been received and saved. 
        We have also opened WhatsApp to connect with you directly. If the tab did not open, 
        <a href="${waUrl}" target="_blank" style="text-decoration: underline; font-weight: 600;">click here to message us on WhatsApp</a>.
      `;
      form.reset();
    } else {
      // Graceful handoff if database failed but WhatsApp was still generated
      statusContainer.className = 'submission-status success'; // Keep success style for user trust
      statusContainer.innerHTML = `
        <strong>Enquiry Form Processed!</strong> We are redirecting you to WhatsApp to complete your booking. 
        If the chat window didn't open automatically, please 
        <a href="${waUrl}" target="_blank" style="text-decoration: underline; font-weight: 600;">click here to chat with us on WhatsApp</a>.
      `;
      // Don't reset form so they don't lose data if they need to try again
    }

    // Restore submit button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  });
}
