import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Modal,
} from '@mui/material';

import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';

import { CheckoutAmount, CheckoutData, CheckoutKey } from './CheckoutType';

export function CheckoutModal({
  checkoutKey,
  checkoutAmount,
  checkoutData,
  showModal,
  setShowModal,
}: {
  checkoutKey: CheckoutKey;
  checkoutAmount: CheckoutAmount;
  checkoutData: CheckoutData;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    if (showModal) {
      async function fetchPaymentWidgets() {
        // ------  결제위젯 초기화 ------
        const tossPayments = await loadTossPayments(checkoutKey.clientKey);
        // 회원 결제
        const widgets = tossPayments.widgets({
          customerKey: checkoutKey.customerKey,
        });
        // 비회원 결제
        // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

        setWidgets(widgets);
      }

      fetchPaymentWidgets();
    }
  }, [showModal]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(checkoutAmount);

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

  const successUrl =
    window.location.origin +
    '/checkout/success?redirect=' +
    window.location.pathname;
  const failUrl =
    window.location.origin +
    '/checkout/fail?redirect=' +
    window.location.pathname;
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
                  ...checkoutData,
                  failUrl: failUrl,
                  successUrl: successUrl,
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
