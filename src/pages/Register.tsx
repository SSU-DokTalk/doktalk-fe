/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/SignupPage.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from "axios";

type FormData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
  birthdate: string;
  gender: string;
  validation: boolean;
  interests: string[];
  agreement1: boolean;
  agreement2: boolean;
  agreement3: boolean;
  allAgreements: boolean;
};

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
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
      birthdate: "",
      gender: "",
      validation: false,
      interests: [],
      agreement1: false,
      agreement2: false,
      agreement3: false,
      allAgreements: false,
    },
  });

  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    if (!data.validation) {
      alert("본인인증을 해주세요");
      return;
    }

    if (data.interests.length === 0) {
      alert("관심분야를 선택해주세요");
      return;
    }

    if (!data.agreement1 || !data.agreement2) {
      alert("필수 약관에 동의해주세요");
      return;
    }

    if (data.password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다");
      return;
    }

    if (data.password !== data.passwordConfirmation) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      axios.post("/api/user/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/login");
    } catch (error: any) {
      alert(error?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleAllAgreementsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setValue("allAgreements", checked);
    setValue("agreement1", checked, { shouldValidate: true });
    setValue("agreement2", checked, { shouldValidate: true });
    setValue("agreement3", checked);
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
            {errors.email && <span>{errors.email.message}</span>}
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
            {errors.nickname && <span>{errors.nickname.message}</span>}
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
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이어야 합니다",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <input
              style={{
                border: "2px solid gray",
                borderRadius: "8px",
                height: "40px",
                padding: "8px",
              }}
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordConfirmation", {
                required: "비밀번호 확인을 입력해주세요",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다",
              })}
            />
            {errors.passwordConfirmation && (
              <span>{errors.passwordConfirmation.message}</span>
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
                type="text"
                placeholder="YYYY-MM-DD"
                {...register("birthdate", {
                  required: "생년월일을 입력해주세요",
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "올바른 형식(YYYY-MM-DD)으로 입력해주세요",
                  },
                })}
              />
              {errors.birthdate && <span>{errors.birthdate.message}</span>}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "bold" }}>성별</label>
              <div style={{ display: "flex", gap: "4px", width: "100%" }}>
                <label
                  style={{
                    border: "2px solid gray",
                    borderRadius: "8px",
                    cursor: "pointer",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    value="male"
                    style={{ marginRight: "8px" }}
                    {...register("gender", { required: "성별을 선택해주세요" })}
                  />
                  남자
                </label>
                <label
                  style={{
                    border: "2px solid gray",
                    borderRadius: "8px",
                    cursor: "pointer",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    value="female"
                    style={{ marginRight: "8px" }}
                    {...register("gender", { required: "성별을 선택해주세요" })}
                  />
                  여자
                </label>
              </div>
              {errors.gender && <span>{errors.gender.message}</span>}
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
              onClick={() => {
                // 실제 본인인증 로직 필요
                // 인증 성공 시:
                setValue("validation", true);
                alert("본인인증이 완료되었습니다.");
              }}
            >
              본인인증
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <div style={{ fontWeight: "bold" }}>관심분야 선택</div>
              <div style={{ fontSize: "13px" }}>
                선택한 관심분야는 개인 맞춤 도서 추천 / 토론방 매칭에
                사용됩니다.
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
                <label
                  key={index}
                  style={{
                    borderRadius: "20px",
                    border: "1px solid #ccc",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    value={selection}
                    {...register("interests")}
                    style={{ marginRight: "8px" }}
                  />
                  {selection}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                {...register("allAgreements")}
                onChange={handleAllAgreementsChange}
              />
              <label style={{ fontWeight: "bold", marginLeft: "8px" }}>
                약관 전체동의
              </label>
            </div>
            <div
              style={{ width: "100%", height: "1px", background: "black" }}
            ></div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                {...register("agreement1", {
                  validate: (val) => val === true || "약관 1에 동의해주세요",
                })}
              />
              <label style={{ marginLeft: "8px" }}>
                {"(필수) 약관 1 동의"}
              </label>
              <div style={{ marginLeft: "auto", marginRight: "16px" }}>
                보기
              </div>
            </div>
            {errors.agreement1 && <span>{errors.agreement1.message}</span>}

            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                {...register("agreement2", {
                  validate: (val) => val === true || "약관 2에 동의해주세요",
                })}
              />
              <label style={{ marginLeft: "8px" }}>
                {"(필수) 약관 2 동의"}
              </label>
              <div style={{ marginLeft: "auto", marginRight: "16px" }}>
                보기
              </div>
            </div>
            {errors.agreement2 && <span>{errors.agreement2.message}</span>}

            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" {...register("agreement3")} />
              <label style={{ marginLeft: "8px" }}>
                {"(선택) 약관 3 동의"}{" "}
              </label>
              <div style={{ marginLeft: "auto", marginRight: "16px" }}>
                보기
              </div>
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
        </form>
      </div>
    </div>
  );
};

export default Register;
