package com.ilovefundy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class DonationController {

    @GetMapping("/donation/{idol_id}")
    public ResponseEntity<Object> idolDonationList(@PathVariable int idol_id) {
        Map<String, Object> result = new LinkedHashMap<>();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
