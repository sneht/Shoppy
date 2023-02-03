import { React, useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
const Invoice = (props) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const componentRef = useRef();
  return (
    <div ref={componentRef} className="row invoicecard text">
      <div className="cs-invoice cs-style1">
        <div className="cs-invoice_in" id="download_section">
          <div className="cs-invoice_head cs-type1 cs-mb25">
            <div className="cs-invoice_left">
              <p className="cs-invoice_number cs-primary_color cs-mb5 cs-f16">
                <b className="cs-primary_color">Invoice No:</b> #
                {props.invoicedata._id}
              </p>
              <p className="cs-invoice_date cs-primary_color cs-m0">
                <b className="cs-primary_color">Date: </b>

                {props.invoicedata.createdAt.substring(0, 10)}
              </p>
              <p className="cs-invoice_date cs-primary_color cs-m0">
                <b className="cs-primary_color">Order Status: </b>
                {props.invoicedata.orderStatus}
              </p>
            </div>
            <div className="cs-invoice_right cs-text_right">
              <div className="cs-logo cs-mb5">
                <img src="images/logob.png" alt="Logo" />
              </div>
            </div>
          </div>
          <div className="cs-invoice_head cs-mb10">
            <div className="cs-invoice_left">
              <b className="cs-primary_color">Invoice To:</b>
              <p>
                {props.invoicedata.userId.firstName}{" "}
                {props.invoicedata.userId.lastName}
                <br />
                {props.invoicedata.addressId.address_1}
                <br />
                {props.invoicedata.addressId.address_2} <br />
                {props.invoicedata.addressId.pincode}
              </p>
            </div>
            <div className="cs-invoice_right cs-text_right">
              <b className="cs-primary_color">Pay To:</b>
              <p>
                804, Fortune Business Hub,
                <br /> Ahmedabad, Gujarat. 380060,
                <br /> PH: +91 79-46006836
                <br /> Service Tax Registration Number: AAACO4007ASD002
              </p>
            </div>
          </div>
          <div className="cs-table cs-style1">
            <div className="cs-round_border">
              <div className="cs-table_responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="cs-width_1 cs-semi_bold cs-primary_color cs-focus_bg">
                        No.
                      </th>
                      <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg">
                        Product Name
                      </th>
                      <th className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                        Description
                      </th>
                      <th className="cs-width_4 cs-semi_bold cs-primary_color cs-focus_bg">
                        Qty
                      </th>
                      <th className="cs-width_5 cs-semi_bold cs-primary_color cs-focus_bg">
                        Price
                      </th>
                      <th className="cs-width_6 cs-semi_bold cs-primary_color cs-focus_bg cs-text_right">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.invoicedata.cartdetail?.map((card, index) => {
                      return (
                        <tr key={`card_${Math.random}`}>
                          <td className="cs-width_1">{index + 1}</td>
                          <td className="cs-width_2">{card.productId.name}</td>
                          <td className="cs-width_3">
                            {card.productId.specification}
                          </td>
                          <td className="cs-width_4"> {card.quantity}</td>
                          <td className="cs-width_5">
                            {" "}
                            &#8377;{card.productId.discountPrice}
                          </td>
                          <td className="cs-width_6 cs-text_right">
                            &#8377;{" "}
                            {card.quantity * card.productId.discountPrice}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="cs-invoice_footer cs-border_top">
                <div className="cs-left_footer cs-mobile_hide">
                  <p className="cs-mb0">
                    <b className="cs-primary_color">Additional Information:</b>
                  </p>
                  <p className="cs-m0">
                    Dear Consumer, the bill payment will reflect in next 48
                    hours or in the next billing cycle, at your service provider
                    end. Please contact paytm customer support for any queries
                    regarding this order.
                  </p>
                </div>
                <div className="cs-right_footer">
                  <table>
                    <tbody>
                      <tr className="cs-border_left">
                        <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                          Order Subtotal
                        </td>
                        <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
                          &#8377; {props.orderSubtotal}
                        </td>
                      </tr>
                      <tr className="cs-border_left">
                        <td className="cs-width_3 cs-semi_bold cs-primary_color ">
                          Promocode:
                        </td>
                        <td className="cs-width_3 cs-semi_bold  cs-primary_color cs-text_right">
                          {props.invoicedata.promocodeId.couponcode}
                        </td>
                      </tr>
                      <tr className="cs-border_left">
                        <td className="cs-width_3 cs-semi_bold cs-primary_color ">
                          Discount Price
                        </td>
                        <td className="cs-width_3 cs-semi_bold cs-primary_color cs-text_right">
                          &#8377; {props.invoicedata.discountPrice}
                        </td>
                      </tr>
                      <tr className="cs-border_left">
                        <td className="cs-width_3 cs-semi_bold cs-primary_color ">
                          Tax (SGST+ CGST)
                        </td>
                        <td className="cs-width_3 cs-semi_bold  cs-primary_color cs-text_right">
                          &#x20b9;{" "}
                          {((props.orderSubtotal / 100) * 18).toFixed(2)}
                        </td>
                      </tr>
                      <tr className="cs-border_left">
                        <td className="cs-width_3 cs-semi_bold cs-primary_color ">
                          Shipping Charge
                        </td>
                        <td className="cs-width_3 cs-semi_bold  cs-primary_color cs-text_right">
                          &#8377; {props.orderSubtotal > 500 ? "0" : "40"}
                        </td>
                      </tr>
                      <tr className="cs-border_left">
                        <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                          Total Amount
                        </td>
                        <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
                          &#8377; {props.invoicedata.totalPrice}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="cs-note">
            <div className="cs-note_left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ionicon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth={32}
                />
                <path
                  d="M256 56v120a32 32 0 0032 32h120M176 288h160M176 368h160"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={32}
                />
              </svg>
            </div>
            <div className="cs-note_right">
              <p className="cs-mb0">
                <b className="cs-primary_color cs-bold">Note:</b>
              </p>
              <p className="cs-m0">
                This is invoice is only a confirmation of the receipt of the
                amount paid against for the service as described above. Subject
                to terms and conditions mentioned at Shoppy
              </p>
            </div>
          </div>
        </div>
        <div className="cs-invoice_btns cs-hide_print">
          <p className="cs-invoice_btn cs-color1" onClick={() => handlePrint()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={32}
              />
              <rect
                x={128}
                y={240}
                width={256}
                height={208}
                rx="24.32"
                ry="24.32"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={32}
              />
              <path
                d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={32}
              />
              <circle cx={392} cy={184} r={24} />
            </svg>
            <span>Print</span>
          </p>
          <Link className="cs-invoice_btn cs-color1" to="/">
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="32px"
              height="32px"
            >
              <path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z" />
            </svg>
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Invoice;
