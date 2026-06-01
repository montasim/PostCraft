import { EMAIL_BRAND } from "@/lib/constants"

const {
  PRIMARY_HEX,
  TEXT_HEX,
  MUTED_HEX,
  BORDER_HEX,
  BG_HEX,
  SURFACE_HEX,
  FONT,
  MAX_WIDTH,
} = EMAIL_BRAND

export function buildEmailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <style>
    @media only screen and (max-width: 480px) {
      .email-container { width: 100% !important; }
      .email-padding { padding: 16px !important; }
      .email-button { width: 100% !important; display: block !important; text-align: center !important; }
      .email-stats-table td { display: block !important; width: 100% !important; box-sizing: border-box !important; }
      .email-source-table { font-size: 12px !important; }
      .email-header-logo { font-size: 16px !important; }
      .email-heading { font-size: 20px !important; }
      .email-body-text { font-size: 14px !important; }
      .email-otp-code { font-size: 28px !important; letter-spacing: 3px !important; }
    }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .email-padding { padding: 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${SURFACE_HEX};font-family:${FONT};-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${SURFACE_HEX};min-width:100%;">
    <tr>
      <td align="center" style="padding:20px 10px;">
        <table class="email-container" role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:${MAX_WIDTH};background-color:${BG_HEX};border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding:0;border-radius:12px 12px 0 0;background-color:${PRIMARY_HEX};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding:24px 20px 16px;">
                    <span class="email-header-logo" style="font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:-0.3px;">
                      ▲ LinkedIQ
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td class="email-padding" style="padding:32px 32px 24px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid ${BORDER_HEX};background-color:${SURFACE_HEX};border-radius:0 0 12px 12px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="font-size:12px;color:${MUTED_HEX};line-height:1.6;">
                    <p style="margin:0 0 4px;">Sent by LinkedIQ — AI-powered LinkedIn content</p>
                    <p style="margin:0;">
                      <a href="{{APP_URL}}" style="color:${PRIMARY_HEX};text-decoration:none;">linkediq.dev</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!-- Tiny spacer text for preview -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:${MAX_WIDTH};">
          <tr>
            <td align="center" style="padding:12px 10px 0;font-size:11px;color:${MUTED_HEX};font-family:${FONT};">
              ${new Date().getFullYear()} LinkedIQ. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function buildEmailButton(href: string, text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding:8px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="background-color:${PRIMARY_HEX};border-radius:8px;">
              <a class="email-button" href="${href}" target="_blank"
                 style="display:inline-block;padding:12px 28px;background-color:${PRIMARY_HEX};color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;line-height:1.4;white-space:nowrap;">
                ${text}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`
}

export function buildEmailDivider(): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
    <tr>
      <td style="height:1px;background-color:${BORDER_HEX};font-size:1px;line-height:1px;">&nbsp;</td>
    </tr>
  </table>`
}

export const EMAIL_COMMON = {
  textStyles: `font-size:15px;color:${TEXT_HEX};line-height:1.6;`,
  mutedStyles: `font-size:13px;color:${MUTED_HEX};line-height:1.5;`,
  headingStyles: `font-size:22px;font-weight:700;color:${TEXT_HEX};margin:0 0 8px;`,
  bodyStyles: `font-size:15px;color:${TEXT_HEX};line-height:1.6;margin:0 0 16px;`,
}
