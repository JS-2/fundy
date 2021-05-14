package com.ilovefundy.controller;

import com.ilovefundy.entity.user.User;
import com.ilovefundy.dto.funding.FundingListResponse;
import com.ilovefundy.dto.idol.IdolResponse;
import com.ilovefundy.dto.user.*;

import com.ilovefundy.service.UserService;
import com.ilovefundy.utils.EncryptionUtils;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.io.IOException;
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
    @PostMapping("/login")
    public ResponseEntity<Object> login(@ApiParam(value = "이메일 패스워드", required = true)
                                            @RequestBody LoginRequest user) {
        Map<String, Object> result = new HashMap<>();
        String encPassword = EncryptionUtils.encryptSHA256(user.getUserPassword());
        Optional<User> userOpt = userService.checkEmailAndPassword(user.getUserEmail(), encPassword);

        // 유저 정보가 존재
        if(userOpt.isPresent()) {
            // UserEmail 을 PK로 하는 JWT 를 생성
            UserResponse userInfo = userService.getUserInfo(userOpt.get());
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("token", userService.getToken(userOpt.get()));
            return new ResponseEntity<>(userInfo, responseHeaders, HttpStatus.OK);
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
    @PostMapping("/signup")
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
    @GetMapping("/user")
    public ResponseEntity<Object> userInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        UserResponse userResponse = userService.getUserInfo(user);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @ApiOperation(value = "닉네임 변경",
                notes = "로그인된 사용자의 닉네임 변경 Request Body Example : {\"nickname\" : \"김우식\"}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "닉네임 변경 성공. OK !!"),
            @ApiResponse(code = 400, message = "폼 유효성 체크 실패. BAD_REQUEST !!"),
            @ApiResponse(code = 409, message = "중복되는 닉네임. CONFLICT !!")
    })
    @PatchMapping("/user/nickname")
    public ResponseEntity<Object> patchNickname(@RequestBody NicknameRequest req) {
        String nickname = req.getNickname();
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        userService.patchNickname(user.getUserId(), nickname);
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
    @GetMapping("/check-nickname/{nickname}")
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
    @PatchMapping("/user/address")
    public ResponseEntity<Object> patchAddress(@RequestBody AddressRequest req) {
        Map<String, Object> result = new HashMap<>();
        // 주소 변경
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        userService.patchAddress(user.getUserId(), req.getAddress());
        result.put("message", "주소가 변경되었습니다!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "비밀번호 변경",
            notes = "로그인된 사용자의 비밀번호 변경 Request Body Example : {\"password\" : \"qwer!@1234\"}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "비밀번호 변경 성공. OK !!"),
            @ApiResponse(code = 400, message = "폼 유효성 체크 실패. BAD_REQUEST !!"),
    })
    @PatchMapping("/user/password")
    public ResponseEntity<Object> patchPassword(@RequestBody PasswordRequest req) {
        Map<String, Object> result = new HashMap<>();
        String password = req.getPassword();
        // 유효성 체크
        if(userService.checkPassword(password)) {
            result.put("message", "유효한 양식을 지켜주세요 [영문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8글자 이상]");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        // 비밀번호 수정
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        userService.patchPassword(user.getUserId(), password);
        result.put("message", "비밀번호를 변경하였습니다");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "프로필 사진 변경",
            notes = "로그인된 사용자의 프로필 사진 변경 Request Body Example : {\"picture\" : \"사진경로\"}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "프로필 사진 변경 성공. OK !!")
    })
    @PatchMapping("/user/user-picture")
    public ResponseEntity<Object> patchPicture(@RequestPart final MultipartFile multipartFile) throws IOException {
        Map<String, Object> result = new HashMap<>();
        // 프로필 사진 변경
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        String userPicture = userService.patchPicture(user.getUserId(), multipartFile);
        result.put("message", "프로필 사진이 변경되었습니다");
        result.put("userPicture", userPicture);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 삭제",
            notes = "회원 정보 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 정보 삭제 성공. NO_CONTENT !!")
    })
    @DeleteMapping("/user")
    public ResponseEntity<Object> deleteUser() {
        Map<String, Object> result = new HashMap<>();
        // 회원 정보 삭제
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        userService.deleteUser(user.getUserId());
        result.put("message", "회원 정보가 삭제되었습니다");
        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "사용자 펀딩내역 리스트",
            notes = "사용자가 펀딩했던 정보(프로젝트, 금액) 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "펀딩내역 리스트 반환. OK !!", response = PayInfoResponse.class)
    })
    @GetMapping("/user/funding")
    public ResponseEntity<Object> fundingPayList() {
        // 사용자 펀딩내역 리스트
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        List<PayInfoResponse> fundingPayList = userService.getFundingPayList(user.getUserId());
        return new ResponseEntity<>(fundingPayList, HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 개설 펀딩 리스트",
            notes = "사용자가 개설한 펀딩의 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "개설 펀딩 리스트 반환. OK !!", response = MyRegisteredFundingResponse.class)
    })
    @GetMapping("/user/registered-funding")
    public ResponseEntity<Object> registeredFundingList() {
        // 사용자 개설 펀딩 리스트
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        List<MyRegisteredFundingResponse> myRegisteredFundingList = userService.getMyRegisteredFundingList(user.getUserId());
        return new ResponseEntity<>(myRegisteredFundingList, HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 관심 펀딩 리스트",
            notes = "사용자가 관심목록에 넣은 펀딩의 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 펀딩 리스트 반환. OK !!", response = FundingListResponse.class)
    })
    @GetMapping("/user/my-funding")
    public ResponseEntity<Object> myFundingList() {
        // 사용자 관심펀딩 리스트
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        List<FundingListResponse> myFundingList = userService.getMyFundingList(user.getUserId());
        return new ResponseEntity<>(myFundingList, HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 관심 펀딩 추가",
            notes = "사용자가 펀딩을 관심목록에 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 펀딩 추가. CREATED !!")
    })
    @PostMapping("/user/my-funding/{funding_id}")
    public ResponseEntity<Object> createMyFunding(@PathVariable int funding_id) {
        Map<String, Object> result = new HashMap<>();
        // 관심펀딩 추가
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        userService.addMyFunding(user.getUserId(), funding_id);
        result.put("message", "관심 펀딩을 추가하였습니다");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @ApiOperation(value = "사용자 관심 펀딩 삭제",
            notes = "사용자가 펀딩을 관심목록에서 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 펀딩 삭제. NO_CONTENT !!")
    })
    @DeleteMapping("/user/my-funding/{funding_id}")
    public ResponseEntity<Object> deleteMyFunding(@PathVariable int funding_id) {
        Map<String, Object> result = new HashMap<>();
        // 관심펀딩 삭제
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        userService.removeMyFunding(user.getUserId(), funding_id);
        result.put("message", "관심 펀딩을 삭제하였습니다");
        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "사용자 관심 아이돌 리스트",
            notes = "사용자가 관심목록에 넣은 아이돌의 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 아이돌 리스트 반환. OK !!", response = IdolResponse.class)
    })
    @GetMapping("/user/my-idol")
    public ResponseEntity<Object> myIdolList() {
        // 사용자 관심아이돌 리스트
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        List<IdolResponse> myIdolList = userService.getMyIdolList(user.getUserId());
        return new ResponseEntity<>(myIdolList, HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 관심 아이돌 추가",
            notes = "사용자가 아이돌을 관심목록에 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 아이돌 추가. CREATED !!")
    })
    @PostMapping("/user/my-idol/{idol_id}")
    public ResponseEntity<Object> addMyIdol(@PathVariable int idol_id) {
        Map<String, Object> result = new HashMap<>();
        // 관심아이돌 추가
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        userService.addMyIdol(user.getUserId(), idol_id);
        result.put("message", "관심 아이돌을 추가하였습니다");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @ApiOperation(value = "사용자 관심 아이돌 삭제",
            notes = "사용자가 아이돌을 관심목록에서 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 아이돌 삭제. NO_CONTENT !!")
    })
    @DeleteMapping("/user/my-idol/{idol_id}")
    public ResponseEntity<Object> deleteMyIdol(@PathVariable int idol_id) {
        Map<String, Object> result = new HashMap<>();
        // 관심아이돌 삭제
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        userService.removeMyIdol(user.getUserId(), idol_id);
        result.put("message", "관심 아이돌에서 삭제하였습니다");
        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }
}
