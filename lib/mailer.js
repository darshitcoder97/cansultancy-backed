const nodeMailer = require("nodemailer");
const smtpConfig = require("../constants/appConstants").SMTPConfig;

exports.forgetPasswordEmail = async (toEmail, user, Otp) => {
  const mailOptions = {
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="color-scheme" content="light dark" />
          <meta name="supported-color-schemes" content="light dark" />
          <title></title>
          <style type="text/css" rel="stylesheet" media="all">
            @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
            /* Base ------------------------------ */
            body {
              width: 100% !important;
              height: 100%;
              margin: 0;
              -webkit-text-size-adjust: none;
              font-family: "Inter", sans-serif;
            }
      
            .white-text {
              color: #ffffff !important;
            }
      
            td {
              word-break: break-word;
            }
      
            .preheader {
              display: none !important;
              visibility: hidden;
              mso-hide: all;
              font-size: 1px;
              line-height: 1px;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
            }
      
            h1 {
              margin-top: 0;
              color: #333333;
              font-size: 22px;
              font-weight: bold;
              text-align: left;
            }
      
            td,
            th {
              font-size: 16px;
            }
      
            p,
            ul,
            ol,
            blockquote {
              margin: 0.4em 0 1.1875em;
              font-size: 16px;
              line-height: 1.625;
            }
      
            p.sub {
              font-size: 13px;
            }
      
            .button {
              display: inline-block;
              text-decoration: none;
              color: #ffffff !important;
              border-radius: 8px;
              box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
              -webkit-text-size-adjust: none;
              box-sizing: border-box;
              background-color: #000000 !important;
              padding: 10px !important;
            }
      
            @media only screen and (max-width: 500px) {
              .button {
                width: 100% !important;
                text-align: center !important;
              }
            }
      
            body {
              background-color: #f2f4f6;
              color: #51545e;
            }
      
            p {
              color: #51545e;
            }
      
            /* Masthead ----------------------- */
            .email-masthead {
              padding: 25px 0;
              text-align: center;
            }
      
            .email-masthead_logo {
              width: 330px;
              height: 300px;
              object-fit: cover;
            }
      
            /* Body ------------------------------ */
            .email-body {
              width: 100%;
              margin: 0;
              padding: 0;
              -premailer-width: 100%;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
            }
      
            .email-body_inner {
              width: 570px;
              margin: 0 auto;
              padding: 0;
              -premailer-width: 570px;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              background-color: #ffffff;
            }
      
            .email-footer {
              width: 570px;
              margin: 0 auto;
              padding: 0;
              -premailer-width: 570px;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              text-align: center;
            }
      
            .email-footer p {
              color: #a8aaaf;
            }
      
            .body-action {
              width: 100%;
              margin: 30px auto;
              padding: 0;
              -premailer-width: 100%;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              text-align: center;
            }
      
            .body-sub {
              margin-top: 25px;
              padding-top: 25px;
              border-top: 1px solid #eaeaec;
            }
      
            .content-cell {
              padding: 45px;
            }
      
            /*Media Queries ------------------------------ */
            @media only screen and (max-width: 600px) {
              .email-body_inner,
              .email-footer {
                width: 100% !important;
              }
            }
      
            @media (prefers-color-scheme: dark) {
              body,
              .email-body,
              .email-body_inner,
              .email-content,
              .email-wrapper,
              .email-masthead,
              .email-footer {
                background-color: #333333 !important;
                color: #fff !important;
              }
      
              p,
              ul,
              ol,
              blockquote,
              h1,
              h2,
              h3,
              span,
              .purchase_item {
                color: #fff !important;
              }
      
              .attributes_content,
              .discount {
                background-color: #222 !important;
              }
      
              .button {
                background-color: #ffffff !important;
              }
            }
      
            :root {
              color-scheme: light dark;
              supported-color-schemes: light dark;
              font-family: "Inter", sans-serif;
            }
          </style>
        </head>
        <body>
          <span class="preheader"
            >Use this link to reset your password. The link is only valid for 24
            hours.</span
          >
          <table
            class="email-wrapper"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
          >
            <tr>
              <td align="center">
                <table
                  class="email-content"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <tr>
                    <td class="email-masthead">
                        <img
                          alt="logo"
                          src="${process.env.LOGO}"
                          class="email-masthead_logo"
                        />
                      </a>
                    </td>
                  </tr>
                  <!-- Email Body -->
                  <tr>
                    <td
                      class="email-body"
                      width="570"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <table
                        class="email-body_inner"
                        align="center"
                        width="570"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                      >
                        <!-- Body content -->
                        <tr>
                          <td class="content-cell">
                            <div>
                              <h1>Hello ${user.Username},</h1>
                              <p>
                                You recently requested to reset your password for your
                                Consultancy account. Use otp below to reset
                                it.
                              </p>
                              <!-- Action -->
                              <table
                                class="body-action"
                                align="center"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                              >
                                <tr>
                                  <td align="center">
                                    <table
                                      width="100%"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      role="presentation"
                                    >
                                      <tr>
                                        <td align="center">
                                        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${Otp}</h2>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <p>Thanks, <br />Consultancy team</p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
      `,
    from: smtpConfig.FROM_EMAIL,
    to: toEmail,
    subject: "Consultancy Password Reset Otp",
  };
  const sendEmailResponse = await sendEmail(mailOptions);
  return sendEmailResponse;
};

async function sendEmail(mailOptions) {
  await transporter.verify(async (error) => {
    if (error) {
      return { error: MESSAGES.SOMETHING_WENT_WRONG };
    }
  });
  const emailResponse = await transporter.sendMail(mailOptions);
  if (!emailResponse.messageId) {
    return { error: MESSAGES.SOMETHING_WENT_WRONG };
  }
  return { result: "Email sent successfully" };
}

const transporter = nodeMailer.createTransport(
  {
    host: smtpConfig.HOST,
    port: smtpConfig.PORT,
    secure: false,
    auth: {
      user: smtpConfig.EMAIL,
      pass: smtpConfig.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  { sendmail: true }
);