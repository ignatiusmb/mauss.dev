<div>
  <span />
  <span />
  <span />
</div>

<style>
  div {
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 1em;
  }
  div span {
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background-color: #fc2f70;
    transform: translateY(-100%);
    animation: wave 0.8s ease-in-out alternate infinite;
  }
  div span:nth-of-type(1) {
    animation-delay: -0.4s;
  }
  div span:nth-of-type(2) {
    animation-delay: -0.2s;
  }
  @keyframes wave {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(100%);
    }
  }
</style>
