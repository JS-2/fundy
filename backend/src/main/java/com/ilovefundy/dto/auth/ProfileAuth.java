package com.ilovefundy.dto.auth;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@Data
public class ProfileAuth {
    @ApiModelProperty(hidden = true)
    private Integer userId;
    @ApiModelProperty(example = "김윤성")
    private String name;
    @ApiModelProperty(example = "멀티파트파일")
    private MultipartFile profilePicture;
    @ApiModelProperty(example = "22")
    private Integer age;
    @ApiModelProperty(example = "저는 아이유 관련 총대를 9살때부터 해왔습니다")
    private String profileHistory;
}
