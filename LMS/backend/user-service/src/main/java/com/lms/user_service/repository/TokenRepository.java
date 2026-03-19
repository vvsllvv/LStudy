package com.lms.user_service.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

//@Repository
//@RequiredArgsConstructor
//public class TokenRepository {
//    private final RedisTemplate<String, Object> redisTemplate;
//
//    private static final String ACCESS_TOKEN_KEY_PREFIX = "user:access";
//    private static final String REFRESH_TOKEN_KEY_PREFIX = "user:refresh";
//
//    private long jwtExpiration = 15;
//
//    private long refreshTokenExpiration = 60;
//
//    public void storeTokens(String username,
//                            String accessToken,
//                            String RefreshToken,
//                            Long accessTokenExpiration,
//                            Long refreshTokenExpiration) {
//
//        String accessKey = ACCESS_TOKEN_KEY_PREFIX + username;
//        redisTemplate.opsForValue().set(accessKey, accessToken);
//        redisTemplate.expire(accessKey, accessTokenExpiration, TimeUnit.MILLISECONDS);
//
//
//        String refreshKey = REFRESH_TOKEN_KEY_PREFIX + username;
//        redisTemplate.opsForValue().set(refreshKey, RefreshToken);
//        redisTemplate.expire(refreshKey, refreshTokenExpiration, TimeUnit.MILLISECONDS);
//    }

//
//    public String getAccessToken(String username) {
//        String accessKey = ACCESS_TOKEN_KEY_PREFIX + username;
//        return getToken(accessKey);
//    }
//}
