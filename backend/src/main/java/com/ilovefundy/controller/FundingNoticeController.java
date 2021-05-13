package com.ilovefundy.controller;

import com.ilovefundy.dto.funding.FundingNoticeListResponse;
import com.ilovefundy.entity.funding.FundingNotice;
import com.ilovefundy.dto.funding.NoticeRequest;
import com.ilovefundy.dto.funding.NoticeUpdateRequest;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.service.FundingNoticeService;
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
    @GetMapping("/fundings/{funding_id}/notices")
//    public ResponseEntity<Object> fundingNoticeList(@PathVariable int funding_id, @RequestParam(defaultValue = "1") int page, int per_page, @RequestParam(required = false) String keyword){
    public ResponseEntity<Object> fundingNoticeList(@PathVariable int funding_id, @RequestParam(defaultValue = "1") int page, int per_page){
            List<FundingNoticeListResponse> fundingNoticeList = fundingNoticeService.getFundingNoticeList(funding_id,page-1, per_page);
        return new ResponseEntity<>(fundingNoticeList, HttpStatus.OK);
    }

    //펀딩 공지사항 상세보기
    @ApiOperation(value = "펀딩 공지사항 상세보기")
    @ApiResponses(@ApiResponse(code = 200, message = "펀딩 공지사항 내용 반환 OK!"))
    @GetMapping("/fundings/{funding_id}/notices/{funding_notice_id}")
    public ResponseEntity<Object> fundingInfo(@PathVariable int funding_notice_id){
        FundingNotice fundingNotice = fundingNoticeService.getFundingNotice(funding_notice_id);
        return new ResponseEntity<>(fundingNotice, HttpStatus.OK);
    }

    //펀딩 공지사항 등록
    @ApiOperation(value = "펀딩 공지사항 등록")
    @ApiResponses({@ApiResponse(code = 201, message = "펀딩 공지사항 등록 성공!"), @ApiResponse(code = 400, message = "펀딩 등록자만 공지사항 작성 가능합니다. UNAUTHORIZED !!")})
    @PostMapping("/fundings/{funding_id}/notices")
    public ResponseEntity<Object> fundingNoticeWrite(@PathVariable int funding_id, @RequestBody @Valid NoticeRequest request) {
        Map<String, Object> result = new HashMap<>();
        //공지사항 등록
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        String regist = fundingNoticeService.addFundingNotice(user.getUserId(), funding_id, request);
        if (regist == "success") {
            result.put("message", "공지사항 등록 성공!");
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
        else{
            result.put("message", "공지사항 등록 실패! 펀딩 등록자만 공지사항 작성 가능합니다.");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    //펀딩 공지사항 수정
    @ApiOperation(value = "펀딩 공지사항 수정")
    @ApiResponses(@ApiResponse(code = 200, message = "펀딩 공지사항 수정 성공!"))
    @PatchMapping("/fundings/notices/{funding_notice_id}")
    public ResponseEntity<Object> fundingNoticeEdit(@PathVariable int funding_notice_id, @RequestBody NoticeUpdateRequest request){
        Map<String, Object> result = new HashMap<>();
        //공지사항 내용 수정
        fundingNoticeService.editFundingNotice(funding_notice_id, request);
        result.put("message", "공지사항이 수정되었습니다.");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    //펀딩 공지사항 삭제
    @ApiOperation(value = "펀딩 공지사항 삭제")
    @ApiResponses({@ApiResponse(code = 204, message = "펀딩 공지사항 삭제 성공. NO_CONTENT !!")})
    @DeleteMapping("/fundings/{funding_id}/notices/{funding_notice_id}")
    public ResponseEntity<Object> fundingNoticeDelete(@PathVariable int funding_notice_id) {
        Map<String, Object> result = new HashMap<>();
        //공지사항 삭제
        fundingNoticeService.deleteFundingNotice(funding_notice_id);
        result.put("message", "공지사항이 삭제되었습니다.");
        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }
}
