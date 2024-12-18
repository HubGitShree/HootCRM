//package com.capstone.crm.crmserver.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/") // Apply to all endpoints
//                .allowedOrigins("http://localhost:4200") // Allow frontend domain
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed methods
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }
//}