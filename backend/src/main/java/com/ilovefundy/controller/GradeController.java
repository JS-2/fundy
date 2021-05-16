package com.ilovefundy.controller;

import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.dto.auth.ImpUidRequest;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.dto.auth.FanAuth;
import com.ilovefundy.dto.auth.ProfileAuth;
import com.ilovefundy.service.GradeService;
import com.ilovefundy.service.UserService;
import com.siot.IamportRestClient.exception.IamportResponseException;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class GradeController {
    private final UserService userService;
    private final GradeService gradeService;
    private final UserDao userDao;

    @ApiOperation(value = "팬활동 인증 신청",
            notes = "사용자가 자신의 팬활동 인증 신청")
    @ApiResponses({
            @ApiResponse(code = 201, message = "팬활동 인증 신청. CREATED !!"),
            @ApiResponse(code = 400, message = "이미 완료된 인증. BAD_REQUEST !!")
    })
    @PostMapping("/grade/fan-auth")
    public ResponseEntity<Object> createFanAuth(@RequestBody FanAuth fanAuth) {
        Map<String, Object> result = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if (user.getIsOfficialFan().getValue().equals("Approve")) {
            result.put("message", "이미 완료된 인증입니다.");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        userService.createFanAuth(user.getUserId(), fanAuth);
        result.put("message", "팬활동 인증 신청에 성공하였습니다");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @ApiOperation(value = "프로필 인증 신청",
            notes = "사용자가 자신의 프로필 인증(이름, 나이, 얼굴사진, 총대경력) 신청")
    @ApiResponses({
            @ApiResponse(code = 201, message = "프로필 인증 신청. CREATED !!"),
            @ApiResponse(code = 400, message = "이미 완료된 인증. BAD_REQUEST !!")
    })
    @PostMapping("/grade/profile-auth")
    public ResponseEntity<Object> createProfileAuth(@ModelAttribute ProfileAuth profileAuth) throws IOException {
        Map<String, Object> result = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if (user.getIsProfile().getValue().equals("Approve")) {
            result.put("message", "이미 완료된 인증입니다.");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        userService.createProfileAuth(user.getUserId(), profileAuth);
        result.put("message", "프로필 인증 신청에 성공하였습니다");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @ApiOperation(value = "성인 인증 정보 조회",
            notes = "클라이언트에서 imp_uid(고유 번호)를 전달받아 해당 사용자의 인증 정보를 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성인 인증 정보 조회. OK !!"),
            @ApiResponse(code = 400, message = "이미 완료된 인증. BAD_REQUEST !!"),
            @ApiResponse(code = 401, message = "성인 인증 실패. UNAUTHORIZED !!"),
    })
    @PostMapping("/grade/certifications")
    public ResponseEntity<Object> certifications(@RequestBody ImpUidRequest req) throws IOException, IamportResponseException {
        Map<String, Object> result = new HashMap<>();
        String imp_uid = req.getImpUid();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if(user.getIsAdult().getValue() == 1) {
            result.put("message", "이미 완료된 인증입니다.");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        if(!gradeService.isAdult(imp_uid)) {
            result.put("message", "성인 인증에 실패했습니다");
            return new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
        }
        user.setIsAdult(User.YesOrNo.Y);
        userDao.save(user);
        result.put("message", "성인 인증에 성공했습니다");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
