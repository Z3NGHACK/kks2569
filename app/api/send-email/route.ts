import { NextRequest, NextResponse } from 'next/server';

// API key mapping from .env - each key sends to its corresponding email
const apiKeys: Record<string, string> = {
  Sophan: process.env.PHANN_API_KEY || '',
  Sokhan: process.env.SOKKHAN_API_KEY || '',
  hasimoto: process.env.HASIMOTO_API_KEY || '',
  info: process.env.INFO_API_KEY || '',
};

// Email mapping - actual recipient emails
const emailAddresses: Record<string, string> = {
  Sophan: 's.phann@kks2026.com',
  Sokhan: 'kks2026@k.sokhan.com',
  hasimoto: 'hasimoto@kks2026.com',
  info: 'info@kks2026.com',
};

// Send email using Resend REST API
async function sendEmail(apiKey: string, emailData: any) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(emailData),
  });
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, type, message, recipient } = body;

    // Validation
    if (!name || !email || !message || !recipient) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Get API key and target email for recipient
    const apiKey = apiKeys[recipient];
    const targetEmail = emailAddresses[recipient];

    if (!apiKey || !targetEmail) {
      return NextResponse.json(
        { error: 'Invalid recipient' },
        { status: 400 }
      );
    }

    // Log submission
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log('Name:', name);
    console.log('From:', email);
    console.log('To:', targetEmail);
    console.log('Recipient:', recipient);
    console.log('Type:', type || 'General');
    console.log('Timestamp:', new Date().toISOString());
    console.log('=====================================');

    // Generate email HTML
    const emailHtml = generateEmailTemplate({ 
      name, email, phone, type, message, recipient 
    });

    // Send email
    const emailResponse = await sendEmail(apiKey, {
      from: 'KKS2026 Contact <onboarding@resend.dev>',
      to: [targetEmail],
      subject: `[KKS2026] ${type ? capitalize(type) : 'New'} Inquiry from ${name}`,
      html: emailHtml,
      reply_to: email,
    });

    if (emailResponse.ok) {
      const result = await emailResponse.json();
      console.log('✅ Email sent to:', targetEmail, 'ID:', result.id);
      
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
        id: result.id,
      });
    } else {
      const errorData = await emailResponse.json();
      console.log('❌ Email failed:', errorData);
      
      return NextResponse.json({
        success: false,
        error: errorData.message || 'Failed to send email',
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Server-safe HTML escape
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Professional Email Template
function generateEmailTemplate(props: {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  recipient: string;
}) {
  const { name, email, phone, type, message, recipient } = props;
  
  const inquiryTypes: Record<string, string> = {
    buying: 'Purchase Inquiry',
    recycle: 'Recycling Service',
    quote: 'Price Quote Request',
    other: 'General Inquiry'
  };

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedPhone = escapeHtml(phone || '');
  const escapedMessage = escapeHtml(message);
  const inquiryType = inquiryTypes[type] || 'General Inquiry';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry - KKS2026</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #f3f4f6;
      padding: 20px;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .header {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .header p {
      color: #d1fae5;
      font-size: 14px;
    }
    .badge {
      display: inline-block;
      background: rgba(255,255,255,0.2);
      color: #ffffff;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .section {
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #059669;
      margin-bottom: 12px;
    }
    .info-card {
      background: #f9fafb;
      border-radius: 12px;
      padding: 20px;
      border-left: 4px solid #059669;
    }
    .info-row {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      width: 100px;
      font-weight: 600;
      color: #6b7280;
      font-size: 13px;
    }
    .info-value {
      flex: 1;
      color: #111827;
      font-size: 14px;
    }
    .info-value a {
      color: #059669;
      text-decoration: none;
    }
    .message-card {
      background: #ecfdf5;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #a7f3d0;
    }
    .message-text {
      color: #374151;
      font-size: 15px;
      line-height: 1.8;
      white-space: pre-wrap;
    }
    .action-section {
      text-align: center;
      padding: 30px;
      background: #f9fafb;
    }
    .reply-button {
      display: inline-block;
      background: #059669;
      color: #ffffff;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      transition: background 0.2s;
    }
    .reply-button:hover {
      background: #047857;
    }
    .footer {
      padding: 24px 30px;
      text-align: center;
      background: #f3f4f6;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .footer strong {
      color: #374151;
    }
    .timestamp {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <h1>📨 New Contact Inquiry</h1>
      <p>KKS2026 Website Submission</p>
      <span class="badge">${inquiryType}</span>
    </div>
    
    <div class="content">
      <div class="section">
        <h2 class="section-title">Contact Information</h2>
        <div class="info-card">
          <div class="info-row">
            <span class="info-label">Name</span>
            <span class="info-value">${escapedName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-value">
              <a href="mailto:${escapedEmail}">${escapedEmail}</a>
            </span>
          </div>
          <div class="info-row">
            <span class="info-label">Phone</span>
            <span class="info-value">${escapedPhone || '<span style="color:#9ca3af;">Not provided</span>'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Recipient</span>
            <span class="info-value" style=" font-weight: 700; color: #059669;">
              ${recipient}
            </span>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2 class="section-title">Message</h2>
        <div class="message-card">
          <p class="message-text">${escapedMessage.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    </div>
    
    <div class="action-section">
      <a href="mailto:${escapedEmail}?subject=Re: Your inquiry to KKS2026" class="reply-button">
        Reply to ${escapedName}
      </a>
    </div>
    
    <div class="footer">
      <p><strong>KKS2026 Co., Ltd.</strong></p>
      <p>This email was sent from the official website contact form.</p>
      <p class="timestamp">
        Received: ${new Date().toLocaleString('en-US', { 
          timeZone: 'Asia/Tokyo',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} (JST)
      </p>
    </div>
  </div>
</body>
</html>
  `;
}