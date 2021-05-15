package com.ilovefundy.dto.donation;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class DonationPlaceListResponse {
    @ApiModelProperty(example = "1")
    private Integer donationPlaceId;
    @ApiModelProperty(example = "하트하트재단")
    private String placeName;
    @ApiModelProperty(example = "서울 송파구 송이로23길 34")
    private String placeAddress;
    @ApiModelProperty(example = "https://ilovefundybucket.s3.ap-northeast-2.amazonaws.com/static/~~.png")
    private String placePicture;
    @ApiModelProperty(example = "하트-하트재단은 하나님의 사랑과 긍휼의 정신을 바탕으로 " +
            "가난과 장애 그리고 질병으로 소외된 국내외의 ~~")
    private String placeDescription;
    @ApiModelProperty(example = "15,500,000")
    private String placeTotalAmount;
}
