package com.ilovefundy.dto.funding;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Data
public class NoticeUpdateRequest {
    @NotNull
    String title;
    @NotNull
    String content;
}
