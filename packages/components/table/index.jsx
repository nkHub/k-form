import "./index.less";

export default {
  name: "KTable",
  render() {
    return (
      <div ref="table" class="k-table">
        <canvas ref="canvas"></canvas>
      </div>
    );
  },
};
