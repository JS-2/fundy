package com.ilovefundy.model.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ProfileAuth {
    @ApiModelProperty(example = "1")
    Integer userId;
    @ApiModelProperty(example = "김윤성")
    String name;
    @ApiModelProperty(example = "./img/~~이미지경로")
    String profilePicture;
    @ApiModelProperty(example = "22")
    Integer age;
    @ApiModelProperty(example = "저는 아이유 관련 총대를 9살때부터 해왔습니다")
    String profileHistory;
}
