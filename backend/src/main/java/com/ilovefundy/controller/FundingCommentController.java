package com.ilovefundy.controller;

import com.ilovefundy.dto.funding.FundingComment;
import com.ilovefundy.service.FundingCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class FundingCommentController {
    private final FundingCommentService fundingCommentService;

    //전체 펀딩 댓글 리스트
    @GetMapping("/fundings/{funding_id}/comments")
    public ResponseEntity<Object> fundingCommentList(@RequestParam(defaultValue = "1") int page, int per_page, @RequestParam(required = false) String keyword) {
        List<FundingComment> fundingCommentList = fundingCommentService.getFundingCommentList(page-1, per_page);
        return new ResponseEntity<>(fundingCommentList, HttpStatus.OK);
    }

    //펀딩 댓글 등록

    //펀딩 댓글 수정

    //펀딩 댓글 삭제
}
