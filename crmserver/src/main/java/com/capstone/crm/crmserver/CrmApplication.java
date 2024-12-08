package com.capstone.crm.crmserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class CrmApplication {

	public static void main(String[] args) {

		// we ensure /logs directory exists
//		File logsDir = new File("logs");
//		if (!logsDir.exists()) {
//			logsDir.mkdir();
//		}



		SpringApplication.run(CrmApplication.class, args);
	}

}
