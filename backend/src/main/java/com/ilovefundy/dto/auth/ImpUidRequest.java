package com.ilovefundy.dto.auth;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ImpUidRequest {
    @ApiModelProperty(example = "아임포트 uid")
    private String impUid;
}
