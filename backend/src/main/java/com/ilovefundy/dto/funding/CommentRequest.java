package com.ilovefundy.dto.funding;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class CommentRequest {
    @NotNull
    String content;
}
