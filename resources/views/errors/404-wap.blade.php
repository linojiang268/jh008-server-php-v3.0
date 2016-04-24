@extends('layouts.wapMain')

@section('title', '社团主页')
    
@section('stylesheet')
    <link rel="stylesheet" href="/static/wap/css/error.css">
@endsection

@section('content')
    <div class="inner-page error-page">
        <span class="error-icon">
            <img class="res-img" src="/static/wap/images/error_icon.png" alt="">
        </span>
        <span class="error-text">该页面无法找到</span>
    </div>
    @include('backstage.wap.downloadBanner')
@endsection

@section('javascript')

@endsection
