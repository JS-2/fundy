package com.ilovefundy.controller;

import com.ilovefundy.model.idol.IdolRequest;
import com.ilovefundy.model.idol.IdolResponse;
import com.ilovefundy.service.IdolService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class IdolController {
    private final IdolService idolService;

    @ApiOperation(value = "아이돌 리스트",
            notes = "전체 아이돌 리스트를 반환한다. + (페이징처리, 이름 or 그룹명으로 검색)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "아이돌 리스트. OK !!")
    })
    @GetMapping("/idols")
    public ResponseEntity<Object> idolList(@RequestParam(defaultValue = "1") int page, int per_page,
                                           @RequestParam(required = false) String keyword) {

        List<IdolResponse> idolList = idolService.getIdolList(page-1, per_page, keyword);
        return new ResponseEntity<>(idolList, HttpStatus.OK);
    }

    @ApiOperation(value = "아이돌 상세보기",
            notes = "아이돌 상세보기\n" +
                    "Response Example : \n{ \"idolInfo\" : {아이돌 정보}, \n" +
                                         "\"idolFundingProject : [해당 아이돌 펀딩 프로젝트 리스트]}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "아이돌 상세보기. OK !!")
    })
    @GetMapping("/idols/{idol_id}")
    public ResponseEntity<Object> idolDetail(@PathVariable int idol_id) {
        Map<String, Object> result = idolService.getIdol(idol_id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "아이돌 추가",
            notes = "아이돌 추가")
    @ApiResponses({
            @ApiResponse(code = 201, message = "아이돌 추가. CREATED !!")
    })
    @PostMapping("/idols")
    public ResponseEntity<Object> addIdol(@RequestBody IdolRequest idolReq) {
        Map<String, String> result = new HashMap<>();
        idolService.addIdol(idolReq);
        result.put("message", "아이돌 추가");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
}
