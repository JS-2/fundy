package com.ilovefundy.controller;

import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.service.FundingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class FundingController {
    private final FundingService fundingService;

    //전체 펀딩 리스트
    @GetMapping("/fundings")
    public ResponseEntity<Object> fundingList(@RequestParam(defaultValue = "1") int page, int per_page, @RequestParam(required = false) String keyword) {
        List<FundingProject> fundingProjectList = fundingService.getFundingList(page-1, per_page);
        return new ResponseEntity<>(fundingProjectList, HttpStatus.OK);
    }

    //펀딩 등록하기
//    @PostMapping("/fundings")
//    public ResponseEntity<Object> fundingRegist(@RequestBody @Valid FundingRegistRequest request, @ApiIgnore Errors errors){

//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    //펀딩 상세보기
    @GetMapping("/fundings/{funding_id}")
    public ResponseEntity<Object> fundingInfo(@PathVariable int funding_id){
        FundingProject fundingProject = fundingService.getFunding(funding_id);
        return new ResponseEntity<>(fundingProject, HttpStatus.OK);
    }

    //펀딩 참여 결제

}