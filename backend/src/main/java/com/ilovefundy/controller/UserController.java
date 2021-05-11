package com.ilovefundy.controller;

import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.dto.user.User;
import com.ilovefundy.model.funding.FundingListResponse;
import com.ilovefundy.model.idol.IdolResponse;
import com.ilovefundy.model.user.LoginRequest;
import com.ilovefundy.model.user.SignupRequest;

import com.ilovefundy.model.user.UserResponse;
import com.ilovefundy.service.UserService;
import com.ilovefundy.utils.EncryptionUtils;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @ApiOperation(value = "로그인", notes = "이메일과 패스워드를 입력으로 받아 로그인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공. OK !!", response = UserResponse.class),
            @ApiResponse(code = 401, message = "유저정보가 없음. UNAUTHORIZED !!")
    })
    @PostMapping("/user/login")
    public ResponseEntity<Object> login(@ApiParam(value = "이메일 패스워드", required = true)
                                            @RequestBody LoginRequest user) {
        Map<String, Object> result = new HashMap<>();
        String encPassword = EncryptionUtils.encryptSHA256(user.getUserPassword());
        Optional<User> userOpt = userService.checkEmailAndPassword(user.getUserEmail(), encPassword);

        // 유저 정보가 존재
        if(userOpt.isPresent()) {
            // UserEmail 을 PK로 하는 JWT 를 생성
            UserResponse userInfo = userService.getUserInfo(userOpt.get().getUserId());
            result.put("token", userService.getToken(userOpt.get()));
            result.put("user", userInfo);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        // 유저 정보가 없음
        else {
            result.put("message", "유저 정보가 없습니다!");
            return new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
        }

    }

    @ApiOperation(value = "회원가입", notes = "사용자 정보를 입력으로 받아 회원가입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원가입 성공. OK !!"),
            @ApiResponse(code = 400, message = "폼 유효성 체크 실패. BAD_REQUEST !!"),
            @ApiResponse(code = 409, message = "중복되는 이메일 or 닉네임. CONFLICT !!")
    })
    @PostMapping("/user/signup")
    public ResponseEntity<Object> signUp(@RequestBody @Valid SignupRequest request, @ApiIgnore Errors errors) {
        Map<String, Object> result = new HashMap<>();
        // Form Validation 에 에러가 발생
        if(errors.hasErrors()) {
            result.put("message", userService.validateHandling(errors));
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        // 이메일 중복처리
        else if(userService.isDuplicatedEmail(request.getEmail())) {
            result.put("message", "중복되는 이메일입니다!");
            return new ResponseEntity<>(result, HttpStatus.CONFLICT);
        }
        // 닉네임 중복처리
        else if(userService.isDuplicatedNickname(request.getNickname())) {
            result.put("message", "중복되는 닉네임입니다!");
            return new ResponseEntity<>(result, HttpStatus.CONFLICT);
        }
        // 회원가입
        else {
            userService.signUp(request);
            result.put("message", "회원가입 성공!");
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @ApiOperation(value = "사용자정보", notes = "사용자 정보 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "사용자 정보. OK !!", response = UserResponse.class),
    })
    @GetMapping("/user/{user_id}")
    public ResponseEntity<Object> userInfo(@PathVariable int user_id) {
        UserResponse user = userService.getUserInfo(user_id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @ApiOperation(value = "닉네임 변경",
                notes = "로그인된 사용자의 닉네임 변경 Request Body Example : {\"nickname\" : \"김우식\"}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "닉네임 변경 성공. OK !!"),
            @ApiResponse(code = 400, message = "폼 유효성 체크 실패. BAD_REQUEST !!"),
            @ApiResponse(code = 409, message = "중복되는 닉네임. CONFLICT !!")
    })
    @PatchMapping("/user/{user_id}/nickname")
    public ResponseEntity<Object> patchNickname(@PathVariable int user_id, @RequestBody Map<String, String> req) {
        String nickname = req.get("nickname");
        Map<String, Object> result = new HashMap<>();
        if(userService.checkNickname(nickname)) {
            result.put("message", "유효한 양식을 지켜주세요 [한글, 영문 2~8자]");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        // 닉네임이 중복이라면
        else if(userService.isDuplicatedNickname(nickname)) {
            result.put("message", "중복된 닉네임 입니다");
            return new ResponseEntity<>(result, HttpStatus.CONFLICT);
        }
        // 닉네임 변경
        userService.patchNickname(user_id, nickname);
        result.put("message", "닉네임 변경 성공!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "닉네임 중복 확인",
            notes = "회원가입 시 닉네임 중복 확인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "사용 가능한 닉네임. OK !!"),
            @ApiResponse(code = 400, message = "폼 유효성 체크 실패. BAD_REQUEST !!"),
            @ApiResponse(code = 409, message = "중복되는 닉네임. CONFLICT !!")
    })
    @GetMapping("/user/check-nickname/{nickname}")
    public ResponseEntity<Object> checkNickname(@PathVariable String nickname) {
        Map<String, Object> result = new HashMap<>();
        // 유효성 체크
        if(userService.checkNickname(nickname)) {
            result.put("message", "유효한 양식을 지켜주세요 [한글, 영문 2~8자]");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        // 중복 체크
        else if(userService.isDuplicatedNickname(nickname)) {
            result.put("message", "중복된 닉네임 입니다");
            return new ResponseEntity<>(result, HttpStatus.CONFLICT);
        }
        result.put("message", "사용가능한 닉네임 입니다");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "주소 변경",
            notes = "로그인된 사용자의 주소 변경 Request Body Example : {\"address\" : \"강북구 수유동\"}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "주소 변경 성공. OK !!"),
    })
    @PatchMapping("/user/{user_id}/address")
    public ResponseEntity<Object> patchAddress(@PathVariable int user_id, @RequestBody Map<String, String> req) {
        Map<String, Object> result = new HashMap<>();
        // 주소 변경
        userService.patchAddress(user_id, req.get("address"));
        result.put("message", "주소가 변경되었습니다!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "비밀번호 변경",
            notes = "로그인된 사용자의 비밀번호 변경 Request Body Example : {\"password\" : \"qwer!@1234\"}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "비밀번호 변경 성공. OK !!"),
            @ApiResponse(code = 400, message = "폼 유효성 체크 실패. BAD_REQUEST !!"),
    })
    @PatchMapping("/user/{user_id}/password")
    public ResponseEntity<Object> patchPassword(@PathVariable int user_id, @RequestBody Map<String, String> req) {
        Map<String, Object> result = new HashMap<>();
        String password = req.get("password");
        // 유효성 체크
        if(userService.checkPassword(password)) {
            result.put("message", "유효한 양식을 지켜주세요 [영문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8글자 이상]");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        // 비밀번호 수정
        userService.patchPassword(user_id, password);
        result.put("message", "비밀번호를 변경하였습니다");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "프로필 사진 변경",
            notes = "로그인된 사용자의 프로필 사진 변경 Request Body Example : {\"picture\" : \"사진경로\"}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "프로필 사진 변경 성공. OK !!")
    })
    @PatchMapping("/user/{user_id}/user-picture")
    public ResponseEntity<Object> patchPicture(@PathVariable int user_id, @RequestBody Map<String, String> req) {
        Map<String, Object> result = new HashMap<>();
        String picture = req.get("picture");
        // 프로필 사진 변경
        userService.patchPicture(user_id, picture);
        result.put("message", "프로필 사진이 변경되었습니다");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 삭제",
            notes = "회원 정보 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 정보 삭제 성공. NO_CONTENT !!")
    })
    @DeleteMapping("/user/{user_id}")
    public ResponseEntity<Object> deleteUser(@PathVariable int user_id) {
        Map<String, Object> result = new HashMap<>();
        // 회원 정보 삭제
        userService.deleteUser(user_id);
        result.put("message", "회원 정보가 삭제되었습니다");
        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "사용자 펀딩내역 리스트",
            notes = "사용자가 펀딩했던 정보(프로젝트, 금액) 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "펀딩내역 리스트 반환. OK !!")
    })
    @GetMapping("/user/{user_id}/funding")
    public ResponseEntity<Object> fundingPayList(@PathVariable int user_id) {
        // 사용자 펀딩내역 리스트
        List<Object> fundingPayList = userService.getFundingPayList(user_id);
        return new ResponseEntity<>(fundingPayList, HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 개설 펀딩 리스트",
            notes = "사용자가 개설한 펀딩의 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "개설 펀딩 리스트 반환. OK !!")
    })
    @GetMapping("/user/{user_id}/registered-funding")
    public ResponseEntity<Object> registeredFundingList(@PathVariable int user_id) {
        // 사용자 개설 펀딩 리스트
        // 펀딩 프로젝트 테이블에 저장된 user_id 로 가져옴 = fundingDao에서 구현
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 관심 펀딩 리스트",
            notes = "사용자가 관심목록에 넣은 펀딩의 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 펀딩 리스트 반환. OK !!")
    })
    @GetMapping("/user/{user_id}/my-funding")
    public ResponseEntity<Object> myFundingList(@PathVariable int user_id) {
        // 사용자 관심펀딩 리스트
        List<FundingListResponse> myFundingList = userService.getMyFundingList(user_id);
        return new ResponseEntity<>(myFundingList, HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 관심 펀딩 추가",
            notes = "사용자가 펀딩을 관심목록에 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 펀딩 추가. CREATED !!")
    })
    @PostMapping("/user/{user_id}/my-funding/{funding_id}")
    public ResponseEntity<Object> createMyFunding(@PathVariable int user_id, @PathVariable int funding_id) {
        Map<String, Object> result = new HashMap<>();
        // 관심펀딩 추가
        userService.addMyFunding(user_id, funding_id);
        result.put("message", "관심 펀딩을 추가하였습니다");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @ApiOperation(value = "사용자 관심 펀딩 삭제",
            notes = "사용자가 펀딩을 관심목록에서 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 펀딩 삭제. NO_CONTENT !!")
    })
    @DeleteMapping("/user/{user_id}/my-funding/{funding_id}")
    public ResponseEntity<Object> deleteMyFunding(@PathVariable int user_id, @PathVariable int funding_id) {
        Map<String, Object> result = new HashMap<>();
        // 관심펀딩 삭제
        userService.removeMyFunding(user_id, funding_id);
        result.put("message", "관심 펀딩을 삭제하였습니다");
        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "사용자 관심 아이돌 리스트",
            notes = "사용자가 관심목록에 넣은 아이돌의 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 아이돌 리스트 반환. OK !!")
    })
    @GetMapping("/user/{user_id}/my-idol")
    public ResponseEntity<Object> myIdolList(@PathVariable int user_id) {
        // 사용자 관심아이돌 리스트
        List<IdolResponse> myIdolList = userService.getMyIdolList(user_id);
        return new ResponseEntity<>(myIdolList, HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 관심 아이돌 추가",
            notes = "사용자가 아이돌을 관심목록에 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 아이돌 추가. CREATED !!")
    })
    @PostMapping("/user/{user_id}/my-idol/{idol_id}")
    public ResponseEntity<Object> addMyIdol(@PathVariable int user_id, @PathVariable int idol_id) {
        Map<String, Object> result = new HashMap<>();
        // 관심아이돌 추가
        userService.addMyIdol(user_id, idol_id);
        result.put("message", "관심 아이돌을 추가하였습니다");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @ApiOperation(value = "사용자 관심 아이돌 삭제",
            notes = "사용자가 아이돌을 관심목록에서 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 아이돌 삭제. NO_CONTENT !!")
    })
    @DeleteMapping("/user/{user_id}/my-idol/{idol_id}")
    public ResponseEntity<Object> deleteMyIdol(@PathVariable int user_id, @PathVariable int idol_id) {
        Map<String, Object> result = new HashMap<>();
        // 관심아이돌 삭제
        userService.removeMyIdol(user_id, idol_id);
        result.put("message", "관심 아이돌에서 삭제하였습니다");
        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }
}
