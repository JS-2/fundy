package com.ilovefundy.controller;

import com.ilovefundy.dto.funding.IsGoodProjectRequest;
import com.ilovefundy.service.AdminService;
import com.ilovefundy.service.FundingService;
import com.ilovefundy.service.MailService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class AdminController {
    private final FundingService fundingService;
    private final AdminService adminService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "로그인 성공 후 access_token", dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "펀딩 승인",
            notes = "관리자의 판단하에 대기중인 펀딩 승인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "펀딩 승인. OK !!")
    })
    @PatchMapping("/admin/funding/{funding_id}/accept")
    public ResponseEntity<Object> acceptFunding(@PathVariable int funding_id, @RequestBody IsGoodProjectRequest req) {
        Map<String, Object> result = new HashMap<>();
        fundingService.patchFundingState(funding_id, true, req.getIsGoodProject());
        adminService.sendSuccessMail(funding_id);
        result.put("message", "펀딩 승인!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "펀딩 거절",
            notes = "관리자의 판단하에 대기중인 펀딩 거절")
    @ApiResponses({
            @ApiResponse(code = 200, message = "펀딩 거절. OK !!"),
    })
    @PatchMapping("/admin/funding/{funding_id}/decline")
    public ResponseEntity<Object> declineFunding(@PathVariable int funding_id) {
        Map<String, Object> result = new HashMap<>();
        fundingService.patchFundingState(funding_id, false, "N");
        adminService.sendFailMail(funding_id);
        result.put("message", "펀딩 거절");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "팬활동 인증 신청 리스트",
            notes = "사용자가 신청한 팬활동 인증 신청 리스트를 관리자에게 보여준다. + 페이징 처리")
    @ApiResponses({
            @ApiResponse(code = 200, message = "팬활동 인증 신청 리스트. OK !!"),
    })
    @GetMapping("/admin/fan-auth")
    public ResponseEntity<Object> fanAuthList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "30")int per_page) {
        // 팬활동 신청한 리스트에서 팬활동 인증 안된 유저만
        List<Object> result = adminService.getFanAuthList(page, per_page);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "팬활동 인증 수락",
            notes = "관리자의 판단하에 사용자가 신청한 팬활동 인증 신청을 수락한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "팬활동 인증 신청 수락. OK !!"),
    })
    @PatchMapping("/admin/fan-auth/{user_id}/accept")
    public ResponseEntity<Object> acceptFanAuth(@PathVariable int user_id) {
        Map<String, Object> result = new HashMap<>();
        adminService.patchFanAuth(user_id, true);
        result.put("message", "팬활동 인증 수락");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "팬활동 인증 거절",
            notes = "관리자의 판단하에 사용자가 신청한 팬활동 인증 신청을 거절한다. 팬활동 경력을 null로 세팅.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "팬활동 인증 신청 거절. OK !!"),
    })
    @PatchMapping("/admin/fan-auth/{user_id}/decline")
    public ResponseEntity<Object> declineFanAuth(@PathVariable int user_id) {
        Map<String, Object> result = new HashMap<>();
        adminService.patchFanAuth(user_id, false);
        result.put("message", "팬활동 인증 거절");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "프로필 인증 신청 리스트",
            notes = "사용자가 신청한 프로필 인증 신청 리스트를 관리자에게 보여준다. + 페이징 처리")
    @ApiResponses({
            @ApiResponse(code = 200, message = "프로필 인증 신청 리스트. OK !!"),
    })
    @GetMapping("/admin/profile-auth")
    public ResponseEntity<Object> profileAuthList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "30")int per_page) {
        // 프로필 인증 신청한 리스트에서 프로필 인증 안된 유저만
        List<Object> result = adminService.getProfileAuthList(page, per_page);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "프로필 인증 수락",
            notes = "관리자의 판단하에 사용자가 신청한 프로필 인증 신청을 수락한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "프로필 인증 신청 수락. OK !!"),
    })
    @PatchMapping("/admin/profile-auth/{user_id}/accept")
    public ResponseEntity<Object> acceptProfileAuth(@PathVariable int user_id) {
        Map<String, Object> result = new HashMap<>();
        adminService.patchProfileAuth(user_id, true);
        result.put("message", "팬활동 인증 수락");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "프로필 인증 거절",
            notes = "관리자의 판단하에 사용자가 신청한 프로필 인증 신청을 거절한다. 프로필 인증 정보들을 null로 세팅.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "프로필 인증 신청 거절. OK !!"),
    })
    @PatchMapping("/admin/profile-auth/{user_id}/decline")
    public ResponseEntity<Object> declineProfileAuth(@PathVariable int user_id) {
        Map<String, Object> result = new HashMap<>();
        adminService.patchProfileAuth(user_id, false);
        result.put("message", "프로필 인증 거절");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "펀딩 완료 처리",
            notes = "종료 날짜가 지난 펀딩 완료 처리. 기부 프로젝트면 모금액을 기부처 테이블에 더해준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "펀딩 완료 처리 성공. OK !!"),
            @ApiResponse(code = 400, message = "이미 완료 처리된 펀딩. BAD_REQUEST !!"),
    })
    @PatchMapping("/admin/funding-complete/{funding_id}")
    public ResponseEntity<Object> completeFunding(@PathVariable int funding_id) {
        Map<String, Object> result = new HashMap<>();
        if(!adminService.completeFunding(funding_id)) {
            result.put("message", "이미 완료 처리된 펀딩");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        result.put("message", "펀딩 완료 처리 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}