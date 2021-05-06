package com.ilovefundy.controller;

import com.ilovefundy.dto.funding.FundingNotice;
import com.ilovefundy.service.FundingNoticeService;
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
public class FundingNoticeController {
    private final FundingNoticeService fundingNoticeService;

    //전체 펀딩 공지사항 리스트
    @ApiOperation(value = "펀딩 공지사항 리스트")
    @ApiResponses(@ApiResponse(code = 200, message = "펀딩 공지사항 리스트 반환 OK!"))
    @GetMapping("/fundings/notices")
    public ResponseEntity<Object> fundingNoticeList(@RequestParam(defaultValue = "1") int page, int per_page, @RequestParam(required = false) String keyword){
        List<FundingNotice> fundingNoticeList = fundingNoticeService.getFundingNoticeList(page-1, per_page);
        return new ResponseEntity<>(fundingNoticeList, HttpStatus.OK);
    }

    //펀딩 공지사항 상세보기
    @ApiOperation(value = "펀딩 공지사항 상세보기")
    @ApiResponses(@ApiResponse(code = 200, message = "펀딩 공지사항 내용 반환 OK!"))
    @GetMapping("/fundings/notices/{funding_notice_id}")
    public ResponseEntity<Object> fundingInfo(@PathVariable int funding_notice_id){
        FundingNotice fundingNotice = fundingNoticeService.getFundingNotice(funding_notice_id);
        return new ResponseEntity<>(fundingNotice, HttpStatus.OK);
    }

    //펀딩 공지사항 등록
    @ApiOperation(value = "펀딩 공지사항 등록")
    @ApiResponses(@ApiResponse(code = 201, message = "펀딩 공지사항 등록 성공!"))
    @PostMapping("/fundings/notices/")
    public ResponseEntity<Object> fundingNoticeWrite(@RequestBody @Valid FundingNotice fundingNotice) {
        fundingNoticeService.addFundingNotice(fundingNotice);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //펀딩 공지사항 수정
//    @PatchMapping("/fundings/notices/{funding_notice_id}")
//    public ResponseEntity<Object> fundingNoticeEdit(@PathVariable int funding_notice_id, @RequestBody @Valid )


    //펀딩 공지사항 삭제
    @ApiOperation(value = "펀딩 공지사항 삭제")
    @ApiResponses({@ApiResponse(code = 204, message = "펀딩 공지사항 삭제 성공. NO_CONTENT !!")})
    @DeleteMapping("/fundings/notices/{funding_notice_id}")
    public ResponseEntity<Object> fundingNoticeDelete(@PathVariable int funding_notice_id) {
        Map<String, Object> result = new HashMap<>();
        //공지사항 삭제
        fundingNoticeService.deleteFundingNotice(funding_notice_id);
        result.put("message", "공지사항이 삭제되었습니다.");
        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }
}
