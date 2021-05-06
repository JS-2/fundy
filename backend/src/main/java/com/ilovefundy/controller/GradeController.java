package com.ilovefundy.controller;

import com.ilovefundy.model.user.FanAuth;
import com.ilovefundy.model.user.ProfileAuth;
import com.ilovefundy.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class GradeController {
    private final UserService userService;

    @ApiOperation(value = "팬활동 인증 신청",
            notes = "사용자가 자신의 팬활동 인증 신청")
    @ApiResponses({
            @ApiResponse(code = 201, message = "팬활동 인증 신청. CREATED !!")
    })
    @PostMapping("/grade/fan-auth")
    public ResponseEntity<Object> createFanAuth(@RequestBody FanAuth fanAuth) {
        Map<String, Object> result = new HashMap<>();
        userService.createFanAuth(fanAuth);
        result.put("message", "팬활동 인증 신청에 성공하였습니다");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @ApiOperation(value = "프로필 인증 신청",
            notes = "사용자가 자신의 프로필 인증(이름, 나이, 얼굴사진, 총대경력) 신청")
    @ApiResponses({
            @ApiResponse(code = 201, message = "프로필 인증 신청. CREATED !!")
    })
    @PostMapping("/grade/profile-auth")
    public ResponseEntity<Object> createProfileAuth(@RequestBody ProfileAuth profileAuth) {
        Map<String, Object> result = new HashMap<>();
        userService.createProfileAuth(profileAuth);
        result.put("message", "프로필 인증 신청에 성공하였습니다");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
}
