package com.printingpro.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Service for sending emails
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${mail.from}")
    private String fromEmail;

    @Value("${mail.to}")
    private String toEmail;

    /**
     * Send contact form notification email asynchronously
     */
    @Async
    public void sendContactFormEmail(String customerName, String customerEmail, 
                                     String customerPhone, String message, UUID productId) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(toEmail);
            mailMessage.setSubject("New Contact Form Submission - Uttam Printing");
            
            StringBuilder emailBody = new StringBuilder();
            emailBody.append("You have received a new contact form submission:\n\n");
            emailBody.append("Customer Details:\n");
            emailBody.append("================\n");
            emailBody.append("Name: ").append(customerName).append("\n");
            emailBody.append("Email: ").append(customerEmail).append("\n");
            
            if (customerPhone != null && !customerPhone.isEmpty()) {
                emailBody.append("Phone: ").append(customerPhone).append("\n");
            }
            
            emailBody.append("\nMessage:\n");
            emailBody.append("========\n");
            emailBody.append(message).append("\n\n");
            
            if (productId != null) {
                emailBody.append("Product ID: ").append(productId.toString()).append("\n");
                emailBody.append("View at: http://localhost:3000/products/").append(productId.toString()).append("\n");
            }
            
            emailBody.append("\n---\n");
            emailBody.append("This is an automated message from Uttam Printing website.");
            
            mailMessage.setText(emailBody.toString());
            
            mailSender.send(mailMessage);
            log.info("Contact form email sent successfully to: {}", toEmail);
            
        } catch (Exception e) {
            log.error("Failed to send contact form email", e);
            // Don't throw exception - we don't want to fail the contact submission
            // if email fails
        }
    }

    /**
     * Send a simple test email
     */
    public void sendTestEmail() {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(toEmail);
            mailMessage.setSubject("Test Email - Uttam Printing");
            mailMessage.setText("This is a test email from Uttam Printing application. Email configuration is working!");
            
            mailSender.send(mailMessage);
            log.info("Test email sent successfully");
            
        } catch (Exception e) {
            log.error("Failed to send test email", e);
            throw new RuntimeException("Failed to send test email: " + e.getMessage());
        }
    }
}

