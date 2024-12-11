/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/SignupPage.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

const SELECTIONS = [
  "정치",
  "경영 / 경제",
  "종교",
  "웹툰",
  "철학",
  "연주회 / 전시회",
  "자기계발",
];

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await signup(data);
      navigate("/login"); // Redirect to login after signup
    } catch (error: any) {
      alert(error);
    }
  };

  return (
    <div
      id="register"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <div className="logo-container">
        <div className="logo dok">讀</div>
        <div className="logo colon">:</div>
        <div className="logo talk">TALK</div>
      </div>
      <div>독서토론 커뮤니티 독TALK에 오신 것을 환영합니다!</div>
      <div
        style={{
          // height: "400px",
          width: "30%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "64px",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            // height: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold" }}>이메일</label>
            <input
              style={{
                border: "2px solid gray",
                borderRadius: "8px",
                height: "40px",
                padding: "8px",
              }}
              {...register("email", { required: "이메일을 입력해주세요" })}
            />
            {errors.email && <span>{errors.email.message as string}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold" }}>닉네임</label>
            <input
              style={{
                border: "2px solid gray",
                borderRadius: "8px",
                height: "40px",
                padding: "8px",
              }}
              {...register("nickname", { required: "닉네임을 입력해주세요" })}
            />
            {errors.nickname && (
              <span>{errors.nickname.message as string}</span>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontWeight: "bold" }}>비밀번호</label>
            <input
              style={{
                border: "2px solid gray",
                borderRadius: "8px",
                height: "40px",
                padding: "8px",
              }}
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: 8,
              })}
            />
            <input
              style={{
                border: "2px solid gray",
                borderRadius: "8px",
                height: "40px",
                padding: "8px",
              }}
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: 8,
              })}
            />
            {errors.password && (
              <span>{errors.password.message as string}</span>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "bold" }}>생년월일</label>
              <input
                style={{
                  border: "2px solid gray",
                  borderRadius: "8px",
                  height: "40px",
                  padding: "8px",
                }}
                type="password"
                {...register("birthdate", {
                  required: "생년월일을 입력해주세요",
                })}
              />
              {errors.birthdate && (
                <span>{errors.birthdate.message as string}</span>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "bold" }}>성별</label>
              <div style={{ display: "flex", gap: "4px", width: "100%" }}>
                <div
                  style={{
                    border: "2px solid gray",
                    borderRadius: "8px",
                    cursor: "pointer",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  남자
                </div>
                <div
                  style={{
                    border: "2px solid gray",
                    borderRadius: "8px",
                    cursor: "pointer",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  여자
                </div>
              </div>
              {errors.gender && <span>{errors.gender.message as string}</span>}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              style={{
                height: "48px",
                backgroundColor: "white",
                color: "#000080",
                border: "solid 2px #000080",
                borderRadius: "8px",
              }}
              type="button"
            >
              본인인증
            </button>
          </div>
        </form>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ fontWeight: "bold" }}>관심분야 선택</div>
            <div style={{ fontSize: "13px" }}>
              선택한 관심분야는 개인 맞춤 도서 추천 / 토론방 매칭에 사용됩니다.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "6px",
              rowGap: "6px",
              justifyContent: "center",
            }}
          >
            {SELECTIONS.map((selection, index) => (
              <button
                style={{
                  borderRadius: "20px",
                  border: "none",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
                key={index}
              >
                {selection}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex" }}>
            <input type="checkbox" />
            <label style={{ fontWeight: "bold" }}>약관 전체동의</label>
          </div>
          <div
            style={{ width: "100%", height: "1px", background: "black" }}
          ></div>
          <div style={{ display: "flex" }}>
            <input type="checkbox" />
            <label>{"(필수) 약관 1 동의"}</label>
            <div style={{ marginLeft: "auto", marginRight: "16px" }}>보기</div>
          </div>
          <div style={{ display: "flex" }}>
            <input type="checkbox" />
            <label>{"(필수) 약관 2 동의"}</label>
            <div style={{ marginLeft: "auto", marginRight: "16px" }}>보기</div>
          </div>
          <div style={{ display: "flex" }}>
            <input type="checkbox" />
            <label>{"(선택) 약관 3 동의"} </label>
            <div style={{ marginLeft: "auto", marginRight: "16px" }}>보기</div>
          </div>
        </div>
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#000080",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          type="submit"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Register;
