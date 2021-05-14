package com.ilovefundy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(value = {"classpath:application-aws.properties"})
public class SpringBootApiMainApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootApiMainApplication.class, args);
    }
}
