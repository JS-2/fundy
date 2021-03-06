package com.ilovefundy.controller;

import com.ilovefundy.dto.funding.FundingCommentListResponse;
import com.ilovefundy.entity.funding.FundingComment;
import com.ilovefundy.dto.funding.CommentRequest;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.service.FundingCommentService;
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
public class FundingCommentController {
    private final FundingCommentService fundingCommentService;

    //전체 펀딩 댓글 리스트
    @ApiOperation(value = "전체 펀딩 댓글 리스트")
    @ApiResponses(@ApiResponse(code = 200, message = "펀딩 댓글 리스트 반환 성공!"))
    @GetMapping("/fundings/{funding_id}/comments")
    public ResponseEntity<Object> fundingCommentList(@PathVariable int funding_id, @RequestParam(defaultValue = "1") int page, int per_page, @RequestParam(required = false) String keyword) {
        List<FundingCommentListResponse> fundingCommentList = fundingCommentService.getFundingCommentList(funding_id, page-1, per_page);
        return new ResponseEntity<>(fundingCommentList, HttpStatus.OK);
    }

    //펀딩 댓글 등록
    @ApiOperation(value = "펀딩 댓글 등록")
    @ApiResponses(@ApiResponse(code = 201, message = "펀딩 댓글 등록 성공!"))
    @PostMapping("/fundings/{funding_id}/comments")
    public ResponseEntity<Object> FundingCommentWrite(@PathVariable int funding_id, @RequestBody @Valid CommentRequest request) {
        Map<String, Object> result = new HashMap<>();
        //댓글 등록
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        fundingCommentService.addFundingComment(user.getUserId(), funding_id, request);
        result.put("message", "댓글 등록 성공!");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    //펀딩 댓글 수정
    @ApiOperation(value = "펀딩 댓글 수정")
    @ApiResponses({@ApiResponse(code = 200, message = "펀딩 댓글 수정 성공!")})
    @PatchMapping("/fundings/comments/{funding_comment_id}")
    public ResponseEntity<Object> FundingCommentUpdate(@PathVariable int funding_comment_id, @RequestBody CommentRequest request) {
        Map<String, Object> result = new HashMap<>();
        //댓글 수정
        fundingCommentService.updateFundingComment(funding_comment_id, request);
        result.put("message", "댓글이 수정되었습니다.");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //펀딩 댓글 삭제
    @ApiOperation(value = "펀딩 댓글 삭제")
    @ApiResponses({@ApiResponse(code = 204, message = "펀딩 댓글 삭제 성공. NO_CONTENT !!")})
    @DeleteMapping("/fundings/comments/{funding_comment_id}")
    public ResponseEntity<Object> FundingCommentDelete(@PathVariable int funding_comment_id) {
        Map<String, Object> result = new HashMap<>();
        //댓글 삭제
        fundingCommentService.deleteFundingComment(funding_comment_id);
        result.put("message", "댓글이 삭제되었습니다.");
        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }
}
