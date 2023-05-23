import { useEffect, useRef, useState } from "react"
import { fabric } from "fabric"
import { Canvas, IObjectOptions } from "fabric/fabric-impl"
import { Select, Button, Space, Input, Form, InputNumber, Drawer } from "antd"
import { IRectOptions } from "fabric/fabric-impl"
import { ICircleOptions } from "fabric/fabric-impl"
import { ILineOptions } from "fabric/fabric-impl"

type ShapeProperty = {
  type: string
  width: number
  height?: number
  color?: string
}

export const FabricCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const [canvasInstance, setCanvasInstance] = useState<Canvas>()
  const [selectValue, setSelectValue] = useState("")
  const options = [
    { value: "line", label: "line" },
    {
      value: "rect",
      label: "rect",
    },
    { value: "circle", label: "circle" },
    { value: "triangle", label: "triangle" },
  ]

  const colorOptions = [
    { value: "green", label: "green" },
    { value: "red", label: "red" },
  ]

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current, {
      backgroundColor: "#e5e5e5",
      height: 400,
    })
    setCanvasInstance(canvas)
    const rect = new fabric.Rect({
      left: 100,
      width: 100,
      height: 100,
      fill: "red",
    })
    canvas.add(rect)

    return () => {
      canvas.dispose()
    }
  }, [])

  const add = (value: ShapeProperty) => {
    // TODO: line 特殊处理
    const shapeLib: any = {
      circle: fabric.Circle,
      rect: fabric.Rect,
      triangle: fabric.Triangle,
      // line: fabric.Line,
    }
    new fabric.Rect({ width: 100 })
    new fabric.Circle({ radius: 100 })
    const option: IObjectOptions & ICircleOptions & ILineOptions = {}
    if (selectValue === "circle") {
      option.radius = value.width
    } else if (selectValue === "rect") {
      option.width = value.width
      option.height = value.height
    } else if (selectValue === "triangle") {
      option.width = value.width
      option.width = value.height
    } else if (selectValue === "line") {
      // option.x1 = 0
      // option.y1 = 0
      // option.x2 = value.width
      // option.y2 = value.height
      // option.width = 2
    }
    option.fill = value.color
    const shape = new shapeLib[selectValue](option)
    // const shape = new fabric.Line([50, 50, 100, 100], { stroke: 'red'})
    // if (selectValue === "circle") {
    //   const circle = new fabric.Circle({
    //     radius: 20,
    //     fill: "red",
    //   })
    //   canvasInstance?.add(circle)
    // } else {
    // const rect = new fabric.Rect({
    //   // left: 100,
    //   width: 100,
    //   height: 100,
    //   fill: "green",
    // })
    // canvasInstance?.add(shape)
    canvasInstance?.add(shape)
    // }
  }

  const selectChange = (value: string) => {
    setSelectValue(value)
  }

  const [open, setOpen] = useState(true)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Drawer title="Basic Drawer" placement="left" open={open} mask={false}>
        <Form onFinish={add}>
          <Space direction="vertical">
            <Form.Item name="type" label="图片类型">
              <Select
                onChange={selectChange}
                style={{ width: 120 }}
                options={options}
                placeholder="选择图片类型"
              ></Select>
            </Form.Item>
            <Form.Item name="width" label="宽度">
              <InputNumber placeholder="输入宽度" />
            </Form.Item>
            <Form.Item name="height" label="高度">
              <InputNumber placeholder="输入高度" />
            </Form.Item>
            <Form.Item name="color" label="颜色">
              <Select
                style={{ width: 120 }}
                options={colorOptions}
                placeholder="选择颜色"
              ></Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">添加</Button>
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
      <canvas width="300" height="300" ref={canvasEl} />
    </div>
  )
}
