package com.ilovefundy.controller;

import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.dto.user.CodeRequest;
import com.ilovefundy.dto.user.EmailRequest;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.service.MailService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
public class MailController {
    private final MailService mailService;
    private final UserDao userDao;

    @ApiOperation(value = "인증코드 메일로 전송", notes = "인증코드 전송")
    @ApiResponses({
            @ApiResponse(code = 200, message = "인증코드 전송 성공. OK !!"),
    })
    @PostMapping("/auth-mail/send")
    public ResponseEntity<Object> sendMail(@RequestBody EmailRequest req) throws Exception {
        Map<String, String> result = new HashMap<>();
        mailService.sendSimpleMessage(req.getEmail(), "emailAuth");
        result.put("message", "이메일을 전송하였습니다. 코드를 확인해주세요");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "인증코드 확인", notes = "인증코드 확인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "이메일 인증성공. OK !!"),
            @ApiResponse(code = 400, message = "올바르지 않은 인증코드. BAD REQUEST !!"),
    })
    @PostMapping("/auth-mail/check-code")
    public ResponseEntity<Object> checkCode(@RequestBody CodeRequest req) {
        Map<String, String> result = new HashMap<>();

        if(MailService.ePw.equals(req.getCode())) {
            result.put("message", "이메일 인증에 성공하였습니다");
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            result.put("message", "올바르지 않은 코드입니다");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "비밀번호 찾기", notes = "비밀번호 찾기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "임시 비밀번호 전송. OK !!"),
            @ApiResponse(code = 400, message = "이메일, 닉네임에 해당하는 유저정보가 없음. BAD REQUEST !!"),
    })
    @PostMapping("/auth-mail/find-password")
    public ResponseEntity<Object> sendTempPassword(@RequestBody EmailRequest req) throws Exception {
        // 이메일을 입력으로 받음. 임시 비밀번호를 이메일로 보냄
        Map<String, String> result = new HashMap<>();
        mailService.sendSimpleMessage(req.getEmail(), "findPassword");
        result.put("message", "이메일을 전송하였습니다. 임시 비밀번호를 확인해주세요");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "임시 비밀번호로 변경", notes = "임시 비밀번호로 변경")
    @ApiResponses({
            @ApiResponse(code = 200, message = "임시 비밀번호로 변경. OK !!"),
    })
    @GetMapping("/auth-mail/temp-password")
    public ResponseEntity<Object> patchTempPassword(HttpServletResponse response,
                                                    @RequestParam String email, @RequestParam String tmpPassword) throws IOException {
        // 전송된 임시비밀번호로 변경됨.
        Map<String, String> result = new HashMap<>();
        User user = userDao.findByUserEmail(email);
        mailService.patchTempPassword(user, tmpPassword);
        result.put("message", "임시 비밀번호로 변경하였습니다.");
        response.sendRedirect("http://www.ilovefundy.com");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
