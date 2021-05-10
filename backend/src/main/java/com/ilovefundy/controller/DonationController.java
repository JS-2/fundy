package com.ilovefundy.controller;

import com.ilovefundy.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class DonationController {
    private final DonationService donationService;

    @GetMapping("/donation/{idol_id}")
    public ResponseEntity<Object> idolDonationList(@PathVariable int idol_id) {
        List<Object> result = donationService.getIdolDonationList(idol_id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/donation/{idol_id}/{donation_id}")
    public ResponseEntity<Object> idolDonationDetailList(@PathVariable int idol_id, @PathVariable int donation_place_id) {
        List<Object> result = donationService.getIdolDonationDetailList(idol_id, donation_place_id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
