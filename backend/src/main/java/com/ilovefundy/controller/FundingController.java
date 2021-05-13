package com.ilovefundy.controller;

import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.model.funding.FundingDetailResponse;
import com.ilovefundy.model.funding.FundingListResponse;
import com.ilovefundy.model.funding.FundingRequest;
import com.ilovefundy.service.FundingService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class FundingController {
    private final FundingService fundingService;

    //전체 펀딩 리스트
    @ApiOperation(value = "전체 펀딩 리스트")
    @ApiResponses(@ApiResponse(code = 200, message = "펀딩 리스트 반환 성공!"))
    @GetMapping("/fundings")
    public ResponseEntity<Object> fundingList(@RequestParam(defaultValue = "1") int page, int per_page, @RequestParam(required = false) String keyword) {
        Map<String, Object> result = new HashMap<>();
        List<FundingListResponse> fundingProjectList = fundingService.getFundingList(page-1, per_page);
        result.put("message", "펀딩 리스트 반환 성공!");
        return new ResponseEntity<>(fundingProjectList, HttpStatus.OK);
    }

    //펀딩 등록하기
    @ApiOperation(value = "펀딩 등록")
    @ApiResponses(@ApiResponse(code = 201, message = "펀딩 등록 성공!"))
    @PostMapping("/fundings")
    public ResponseEntity<Object> fundingWrite(@RequestBody @Valid FundingRequest request){
        Map<String, Object> result = new HashMap<>();
        fundingService.addFunding(request);
        result.put("message", "펀딩 등록 성공!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //펀딩 상세보기
    @ApiOperation(value = "펀딩 상세보기")
    @ApiResponses(@ApiResponse(code = 200, message = "펀딩 상세보기 성공!"))
    @GetMapping("/fundings/{funding_id}")
    public ResponseEntity<Object> fundingInfo(@PathVariable int funding_id){
        FundingDetailResponse fundingProject = fundingService.getFunding(funding_id);
        return new ResponseEntity<>(fundingProject, HttpStatus.OK);
    }

    //펀딩 참여 결제

}