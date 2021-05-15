package com.ilovefundy.controller;

import com.ilovefundy.dto.donation.DonationPlaceListResponse;
import com.ilovefundy.dto.idol.IdolDonationDetailResponse;
import com.ilovefundy.dto.idol.IdolDonationListResponse;
import com.ilovefundy.dto.idol.IdolDonationRankingResponse;
import com.ilovefundy.service.DonationService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class DonationController {
    private final DonationService donationService;

    @ApiOperation(value = "기부처 리스트",
            notes = "기부처들의 리스트. (기부처 id, 기부처 이름, 기부처 주소, 기부금액)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "기부처 리스트. OK !!", response = DonationPlaceListResponse.class),
    })
    @GetMapping("/donation-places")
    public ResponseEntity<Object> donationPlaceList() {
        List<DonationPlaceListResponse> result = donationService.getDonationPlaceList();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "아이돌 기부처 리스트",
            notes = "아이돌이 기부한 기부처들의 리스트. (기부처 id, 기부처 이름, 기부처 주소, 기부금액)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "아이돌 기부처 리스트. OK !!", response = IdolDonationListResponse.class),
    })
    @GetMapping("/donation/{idol_id}")
    public ResponseEntity<Object> idolDonationList(@ApiParam(example = "1") @PathVariable int idol_id) {
        List<IdolDonationListResponse> result = donationService.getIdolDonationList(idol_id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "아이돌 기부처 상세보기",
            notes = "아이돌이 기부한 기부처 상세보기. (기부처 id, 기부처 이름, 기부처 주소, 기부금액)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "아이돌 기부처 상세보기. OK !!", response = IdolDonationDetailResponse.class),
    })
    @GetMapping("/donation/{idol_id}/{donation_place_id}")
    public ResponseEntity<Object> idolDonationDetailList(@PathVariable int idol_id, @PathVariable int donation_place_id) {
        List<IdolDonationDetailResponse> result = donationService.getIdolDonationDetailList(idol_id, donation_place_id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "전체 아이돌 기부 순위",
            notes = "아이돌을 기부금액으로 순위를 매김. Top5 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "전체 아이돌 기부 순위. OK !!", response = IdolDonationRankingResponse.class),
    })
    @GetMapping("/donation/idol/ranking")
    public ResponseEntity<Object> idolDonationRankingList() {
        List<IdolDonationRankingResponse> idolDonationRankingList = donationService.getIdolDonationRankingList();
        return new ResponseEntity<>(idolDonationRankingList, HttpStatus.OK);
    }
}
