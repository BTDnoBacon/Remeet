package com.example.remeet.dto;

import lombok.Data;

@Data
public class UserInfoDto {
    private Integer userNo;
    private String userName;
    private String imagePath;
    private String userEmail;
    private TokenResponseDto tokenResponse;

}
