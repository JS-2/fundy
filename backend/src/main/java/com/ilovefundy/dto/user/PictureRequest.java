package com.ilovefundy.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class PictureRequest {
    @ApiModelProperty(example = "/이미지경로~")
    private String picture;
}
