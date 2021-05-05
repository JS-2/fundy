package com.ilovefundy.model.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@NoArgsConstructor
@Valid
@Data
public class SignupRequest {
    @NotNull
    @Pattern(regexp = "^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\\.[A-Za-z0-9\\-]+",
            message = "이메일 형식에 맞춰 작성해주세요")
    String email;
    //^(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d$@$!%*#?&]{8,}$
    @NotNull
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "비밀번호는 영문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8글자 이상의 비밀번호여야 합니다")
    String password;

    @NotNull
    @Pattern(regexp = "^[A-Za-z가-힣]{2,8}$",
            message = "닉네임은 영문 or 한글이 포함된 2~8글자 사이여야 합니다")
    String nickname;

    String address;
}
