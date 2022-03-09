import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 0;
  min-width: 230px;
`;

export const ContainerHeader = styled.div`
  padding-bottom: 40px;

  .text {
    width: 100%;
    height: 70px;
    display: grid;
    place-items: center;
    background: var(--secondary-color);

    h3 {
      font-size: 36px;
      color: var(--gray4);
      text-transform: uppercase;
    }
  }

  .info {
    padding: 20px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;

    #total {
      min-width: 190px;
    }
  }

  .validation_status {
    padding: 20px 40px;
    border: 2px solid var(--gray2);
    min-height: 100px;
    display: grid;
    place-items: center;
    max-width: 600px;
    margin: 0 auto;

    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;

      &.success {
        svg {
          color: var(--secondary-color);
          font-size: 36px;
          min-width: 36px;
        }
      }

      &.fail {
        svg {
          color: var(--primary-color);
          font-size: 36px;
          min-width: 36px;
        }
      }

      h3 {
        max-width: 512px;
        font-size: 24px;
        font-size: calc(16px + 2 * ((100vw - 320px) / 680));
        text-align: center;
      }
    }
  }
`;

export const ContainerMain = styled.div`
  padding: 40px 0;
  border-top: 2px solid var(--gray2);
  border-bottom: 2px solid var(--gray2);
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  .card {
    width: 100%;
    max-width: 235px;
    min-height: 370px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--gray2);
    /* animation: fade_in_card 0.5s 1 ease-in-out;
    @keyframes fade_in_card {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
    } */

    &:nth-child(odd) {
      animation: fade_in_card 0.45s 1 ease-in-out;
    }
    &:nth-child(even) {
      animation: fade_in_card 0.5s 1 ease-in-out;
    }

    @keyframes fade_in_card {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      70% {
        opacity: 1;
        transform: scale(1.05);
      }
    }

    :hover {
      color: var(--gray1);
      border: solid 2px transparent;
      background-image: linear-gradient(var(--gray4), var(--gray4)),
        radial-gradient(circle at top left, #ff55bb, #ff4343);
      background-origin: border-box;
      background-clip: content-box, border-box;
    }

    .content {
      width: 100%;
      flex: 1;
      display: grid;
      place-items: center;
      h3 {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
      }
    }

    .footer {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 15px;
    }

    &.filled {
      .header {
        width: 100%;
        height: 145px;
        background: #fff;
        display: grid;
        place-items: center;

        img {
          width: 130px;
          height: 130px;
          object-fit: contain;
        }
      }

      .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
        gap: 5px;

        #details {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          color: var(--gray2);
          cursor: pointer;

          :hover {
            color: var(--gray1);
          }
        }

        .fixed {
          color: var(--gray3);
          user-select: none;
        }

        #model {
          text-align: center;
        }

        #category {
          font-size: 14px;
          color: var(--gray2);
        }

        #model {
          font-size: 14px;
          font-weight: 400;
        }

        #price {
          font-size: 14px;
        }
      }
    }
  }
`;

export const ContainerFooter = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;
