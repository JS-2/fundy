package com.ilovefundy.controller;

import com.ilovefundy.dto.funding.FundingNotice;
import com.ilovefundy.service.FundingNoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class FundingNoticeController {
    private final FundingNoticeService fundingNoticeService;

    //전체 펀딩 공지사항 리스트
    @GetMapping("/fundings/{funding_id}/notice")
    public ResponseEntity<Object> fundingNoticeList(@RequestParam(defaultValue = "1") int page, int per_page, @RequestParam(required = false) String keyword){
        List<FundingNotice> fundingNoticeList = fundingNoticeService.getFundingNoticeList(page-1, per_page);
        return new ResponseEntity<>(fundingNoticeList, HttpStatus.OK);
    }

    //펀딩 공지사항 상세보기
    @GetMapping("/fundings/{funding_id}/notices/{funding_notice_id}")
    public ResponseEntity<Object> fundingInfo(@PathVariable int funding_notice_id){
        FundingNotice fundingNotice = fundingNoticeService.getFundingNotice(funding_notice_id);
        return new ResponseEntity<>(fundingNotice, HttpStatus.OK);
    }
}
