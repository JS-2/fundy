package com.ilovefundy.model.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class NicknameRequest {
    @ApiModelProperty(example = "김우식")
    private String nickname;
}
