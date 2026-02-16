package com.lms.user_service.security;

import com.lms.user_service.dto.ResponseDto;
import com.lms.user_service.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private String generateJwtToken(User user, Integer minutes) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("role", user.getRole());
        claims.put("email", user.getEmail());

        Date date = Date.from(LocalDateTime.now().plusMinutes(minutes).atZone(ZoneId.systemDefault()).toInstant());

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .expiration(date)
                .signWith(getSignInKey())
                .compact();
    }

    public ResponseDto generateAuthToken(User user) {
        ResponseDto responseDto = new ResponseDto(
                generateJwtToken(user, 15),
                generateJwtToken(user, 60));

        return responseDto;
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSignInKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return true;
        } catch (ExpiredJwtException e) {
            log.error("Expired JwtException error.", e);
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JwtException", e);
        } catch (MalformedJwtException e) {
            log.error("Malformed JwtException", e);
        } catch (SecurityException e) {
            log.error("Security Exception", e);
        } catch (Exception e) {
            log.error("Invalid token", e);
        }
        return false;
    }

    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getBody();
    }

    public String getRole(String token) {
        return getAllClaimsFromToken(token).get("role", String.class);
    }

    public String getEmailFromToken(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    public ResponseDto refreshBaseToken(User user, String refreshToken) {
        ResponseDto responseDto = new ResponseDto(
                generateJwtToken(user, 15),
                refreshToken);

        return responseDto;
    }
}
