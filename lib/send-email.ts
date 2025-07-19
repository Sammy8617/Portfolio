"use server"

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Validate the form data
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all fields.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  try {
    // In a real implementation, you would use an email service like Resend, SendGrid, etc.
    // For now, we'll simulate the email sending

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here's where you would integrate with your email service
    // Example with Resend:
    /*
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'portfolio@yourdomain.com',
      to: 'aryangarv160504@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })
    */

    // For demonstration, we'll log the email details
    console.log("Email would be sent to: aryangarv160504@gmail.com")
    console.log("Subject:", `Portfolio Contact: ${name}`)
    console.log("From:", email)
    console.log("Message:", message)

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again or contact me directly.",
    }
  }
}
