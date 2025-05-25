import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Modal,
} from '@mui/material';

import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';

export function CheckoutModal({
  data,
  showModal,
  setShowModal,
}: {
  data: {
    clientKey: string;
    customerKey: string;
    amount: {
      currency: string; // KRW
      value: number;
    };
  }; // TODO:
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(data.clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey: data.customerKey,
      });
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [data]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(data.amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount(data.amount);
  }, [widgets, data.amount]);

  return (
    <Modal
      className='flex items-center justify-center'
      open={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <div className='wrapper bg-white container'>
        <div className='box_section pb-6!'>
          {/* 결제 UI */}
          <div id='payment-method' />
          {/* 이용약관 UI */}
          <div id='agreement' />

          {/* 결제하기 버튼 */}
          <button
            className='button block mx-auto!'
            disabled={!ready}
            onClick={async () => {
              try {
                // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                await widgets.requestPayment({
                  orderId: 'H_9uNV6Uz4Kt-eM9GrGYG',
                  orderName: '토스 티셔츠 외 2건',
                  successUrl: window.location.origin + '/success',
                  failUrl: window.location.origin + '/fail',
                  customerEmail: 'customer123@gmail.com',
                  customerName: '김토스',
                  customerMobilePhone: '01012341234',
                });
              } catch (error) {
                // 에러 처리하기
                console.error(error);
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
