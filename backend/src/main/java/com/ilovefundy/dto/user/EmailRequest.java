package com.ilovefundy.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class EmailRequest {
    @ApiModelProperty(example = "msmf3@naver.com")
    private String email;
}
