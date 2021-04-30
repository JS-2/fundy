package com.ilovefundy.controller;

import com.ilovefundy.model.user.SignupRequest;

import com.ilovefundy.service.UserService;
import com.ilovefundy.utils.EncryptionUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;
//    private final UserDao userDao;

    @PostMapping("/user/login")
    public ResponseEntity<Object> login(@RequestBody Object user) {
        Map<String, Object> resultMap = new HashMap<>();
        String encPassword = EncryptionUtils.encryptSHA256("1234"/*user.getUserPassword()*/);
        Optional<Object> userOpt = null;/*userDao.findUserByEmailAndPassword(user.getUserEmail(), encPassword);*/

        // 유저 정보가 존재
        if(userOpt.isPresent()) {
            // UserEmail 을 PK로 하는 JWT 를 생성
            resultMap.put("token", userService.getToken(userOpt.get()));
            return new ResponseEntity<>(HttpStatus.OK);
        }
        // 유저 정보가 없음
        else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }

    @PostMapping("/user/signup")
    public ResponseEntity<Object> signup(@RequestBody @Valid SignupRequest request, @ApiIgnore Errors errors) {
        // Form Validation 에 에러가 발생
        if(errors.hasErrors()) {
            Object message = userService.validateHandling(errors);
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        // 이메일 중복처리
        else if(request.getEmail() != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        // 닉네임 중복처리
        else if(request.getNickname() != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        // 회원가입
        else {
            // 이메일 인증 코드
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<Object> userInfo(@PathVariable int user_id) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/user/{user_id}/nickname")
    public ResponseEntity<Object> patchNickname(@PathVariable int user_id, @RequestBody Object user) {
        String nickname = "";/*user.getNickname();*/
        if(!Pattern.matches("^[A-za-z가-힣]{2,8}$", nickname)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // 닉네임이 중복이라면
        else if(true) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        // 닉네임 변경
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/check-nickname/{nickname}")
    public ResponseEntity<Object> checkNickname(@PathVariable String nickname) {
        // 유효성 체크
        if(!Pattern.matches("^[A-Za-z가-힣]{2,8}$", nickname)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // 중복 체크
        else if(true) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/user/{user_id}/address")
    public ResponseEntity<Object> patchAddress(@PathVariable int user_id, @RequestBody Object user) {
        // 주소 변경
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/user/{user_id}/password")
    public ResponseEntity<Object> patchPassword(@PathVariable int user_id, @RequestBody @Valid SignupRequest user,
                                              @ApiIgnore Errors errors) {
        // 유효성 체크
        if(errors.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // 비밀번호 수정
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/user/{user_id}/user-picture")
    public ResponseEntity<Object> patchPicture(@PathVariable int user_id, @RequestBody Object user) {
        String picture;
        // 프로필 사진 변경
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/user/{user_id}")
    public ResponseEntity<Object> deleteUser(@PathVariable int user_id) {
        // 회원 정보 삭제
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/{user_id}/funding")
    public ResponseEntity<Object> fundingList(@PathVariable int user_id) {
        // 사용자 펀딩내역 리스트
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/{user_id}/registered-funding")
    public ResponseEntity<Object> registeredFundingList(@PathVariable int user_id) {
        // 사용자 개설 펀딩 리스트
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/{user_id}/my-funding")
    public ResponseEntity<Object> myFundingList(@PathVariable int user_id) {
        // 사용자 관심펀딩 리스트
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/user/{user_id}/my-funding")
    public ResponseEntity<Object> createMyFunding(@PathVariable int user_id, @RequestBody Object funding) {
        // 관심펀딩 추가
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/user/{user_id}/my-funding/{funding_id}")
    public ResponseEntity<Object> deleteMyFunding(@PathVariable int user_id, @PathVariable int funding_id) {
        // 관심펀딩 삭제
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/{user_id}/my-idol")
    public ResponseEntity<Object> myIdolList(@PathVariable int user_id) {
        // 사용자 관심아이돌 리스트
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/user/{user_id}/my-idol")
    public ResponseEntity<Object> createMyIdol(@PathVariable int user_id, @RequestBody Object idol) {
        // 관심아이돌 추가
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/user/{user_id}/my-idol/{idol_id}")
    public ResponseEntity<Object> deleteMyIdol(@PathVariable int user_id, @PathVariable int idol_id) {
        // 관심아이돌 삭제
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
