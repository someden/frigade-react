import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { FormInputProps, FormInputType } from '../../../../../FrigadeForm/types'
import { getClassName, getCustomClassOverrides } from '../../../../../shared/appearance'
import { Label } from '../shared/Label'

interface TextFieldProps extends FormInputType {
  id: string
  title?: string
  placeholder?: string
  multiline?: boolean
}

const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const TextInput = styled.input`
  :not(${(props) => getCustomClassOverrides(props)}) {
    // Anything inside this block will be ignored if the user provides a custom class
    border: 1px solid ${(props) => props.appearance?.theme?.colorBorder};
    font-size: 14px;
    ::placeholder {
      color: #c7c7c7;
      font-size: 14px;
    }
    border-radius: 6px;
  }
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 0 10px;
  margin-bottom: 10px;
`
const TextArea = styled.textarea`
  :not(${(props) => getCustomClassOverrides(props)}) {
    // Anything inside this block will be ignored if the user provides a custom class
    border: 1px solid ${(props) => props.appearance?.theme?.colorBorder};
    font-size: 14px;
    padding: 10px;
    ::placeholder {
      color: #c7c7c7;
      font-size: 14px;
    }
    border-radius: 6px;
  }
  width: 100%;
  min-height: 70px;
  box-sizing: border-box;
  margin-bottom: 10px;
`

export function TextField({
  formInput,
  customFormTypeProps,
  onSaveInputData,
  setFormValidationErrors,
}: FormInputProps) {
  const input = formInput as TextFieldProps
  const [data, setData] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)
  let InputComponent = TextInput
  useEffect(() => {
    if (data === '' && !hasLoaded) {
      setHasLoaded(true)
      handleDataChange('')
    }
  }, [])

  function handleDataChange(value: string) {
    setData(value)
    if (input.required === true && value.trim() === '') {
      setFormValidationErrors([
        {
          id: input.id,
          message: `${input.title} is required`,
        },
      ])
      return
    }
    setFormValidationErrors([])
    onSaveInputData({ text: value })
  }

  if (input.multiline) {
    InputComponent = TextArea
  }

  return (
    <TextInputWrapper>
      <Label
        title={input.title}
        required={input.required}
        appearance={customFormTypeProps.appearance}
      />
      <InputComponent
        className={getClassName('inputComponent', customFormTypeProps.appearance)}
        value={data}
        onChange={(e) => {
          handleDataChange(e.target.value)
        }}
        appearance={customFormTypeProps.appearance}
        placeholder={input.placeholder}
      ></InputComponent>
    </TextInputWrapper>
  )
}
