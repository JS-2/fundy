package com.ilovefundy.controller;

import com.ilovefundy.dto.funding.FundingDetailResponse;
import com.ilovefundy.dto.funding.FundingListResponse;
import com.ilovefundy.dto.funding.FundingPayRequest;
import com.ilovefundy.dto.funding.FundingRequest;
import com.ilovefundy.dto.user.PayInfoResponse;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.service.FundingService;
import com.siot.IamportRestClient.exception.IamportResponseException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class FundingController {
    private final FundingService fundingService;

    //전체 펀딩 리스트
    @ApiOperation(value = "전체 펀딩 리스트", notes = "status = 0: 대기, 1: 승인, 2: 거절\n (status:1 일 때)time = 0: 진행 전, 1: 진행 중, 2: 완료(성공), 3: 완료(실패)")
    @ApiResponses(@ApiResponse(code = 200, message = "펀딩 리스트 반환 성공!"))
    @GetMapping("/fundings")
    public ResponseEntity<Object> fundingList(@RequestParam(defaultValue = "1") int page, int per_page, @RequestParam(required = false) String keyword, @RequestParam(required = false) Integer status, @RequestParam(required = false) Integer time) {
        Map<String, Object> result = new HashMap<>();
        List<FundingListResponse> fundingProjectList = fundingService.getFundingList(page-1, per_page, keyword, status, time);
        result.put("message", "펀딩 리스트 반환 성공!");
        return new ResponseEntity<>(fundingProjectList, HttpStatus.OK);
    }

    //펀딩 등록하기
    @ApiOperation(value = "펀딩 등록")
    @ApiResponses(@ApiResponse(code = 201, message = "펀딩 등록 성공!"))
    @PostMapping("/fundings")
    public ResponseEntity<Object> fundingWrite(@ModelAttribute FundingRequest request) throws IOException {
        Map<String, Object> result = new HashMap<>();
        // 펀딩 등록
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        fundingService.addFunding(user.getUserId(), request);
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
    @ApiOperation(value = "펀딩 결제하기")
    @ApiResponses({@ApiResponse(code = 200, message = "펀딩 결제하기 성공!, OK !!"),
                   @ApiResponse(code = 400, message = "펀딩 결제하기 실패, BAD_REQUEST !!")})
    @PostMapping("/fundings/{funding_id}/pay")
    public ResponseEntity<Object> fundingPay(@PathVariable int funding_id, @RequestBody FundingPayRequest request) throws IOException, IamportResponseException {
        Map<String, Object> result = new HashMap<>();
        //펀딩 결제
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        PayInfoResponse payInfoResponse = fundingService.addFundingPay(user.getUserId(), funding_id, request);
        if(payInfoResponse == null) {
            result.put("message", "펀딩 결제 실패");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(payInfoResponse, HttpStatus.OK);
    }

}