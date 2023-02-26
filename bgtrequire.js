function global_getUserId() {
    return localStorage.getItem(NAME_LOCAL_GLOBAL_USERID)
}
function global_setUserId(n) {
    localStorage.setItem(NAME_LOCAL_GLOBAL_USERID, n)
}
function global_getCart() {
    return JSON.parse(localStorage.getItem(NAME_LOCAL_GLOBAL_CART))
}
function global_setCart(n) {
    localStorage.setItem(NAME_LOCAL_GLOBAL_CART, JSON.stringify(n))
}
function global_getUserEmail() {
    return localStorage.getItem(NAME_LOCAL_GLOBAL_EMAIL)
}
function global_setUserEmail(n) {
    localStorage.setItem(NAME_LOCAL_GLOBAL_EMAIL, n)
}
function global_getAlbumMedia() {
    return JSON.parse(localStorage.getItem(NAME_LOCAL_GLOBAL_ALBUM))
}
function global_setAlbumMedia(n) {
    localStorage.setItem(NAME_LOCAL_GLOBAL_ALBUM, JSON.stringify(n))
}
function global_getBaseUrl() {
    var n = $(NAME_VARIABLE_BASEURL).val();
    return n === undefined || n === null ? "" : n
}
function global_setBaseUrl(n) {
    $(NAME_VARIABLE_BASEURL).val(n)
}
function global_getEcommerceUrl() {
    var n = $(NAME_VARIABLE_ECOMMERCE_URL).val();
    return n === undefined || n === null ? "" : n
}
function getSites(n, t) {
    $.ajax({
        type: "GET",
        url: global_getBaseUrl() + "/api/lookup/sites",
        cache: !1,
        contentType: "application/json; charset-utf-8",
        success: function(t) {
            n(t)
        },
        error: function(n) {
            if (n != null && n != undefined)
                return t(n)
        }
    })
}
function getLocations(n, t, i) {
    $.ajax({
        type: "GET",
        url: global_getBaseUrl() + "/api/lookup/locations/" + n,
        cache: !1,
        contentType: "application/json; charset-utf-8",
        success: function(n) {
            t(n)
        },
        error: function(n) {
            if (n != null && n != undefined)
                return i(n)
        }
    })
}
function getDates(n, t, i) {
    $.ajax({
        type: "GET",
        url: global_getBaseUrl() + "/api/lookup/locationdates/" + n,
        cache: !1,
        contentType: "application/json; charset-utf-8",
        success: function(n) {
            t(n)
        },
        error: function(n) {
            if (n != null && n != undefined)
                return i(n)
        }
    })
}
function getTimes(n, t, i, r) {
    t == null ? $.ajax({
        type: "POST",
        url: global_getBaseUrl() + "/api/lookup/locationtimes/" + n + "/current",
        cache: !1,
        contentType: "application/json; charset-utf-8",
        dataType: "json",
        success: function(n) {
            i(n)
        },
        error: function(n) {
            if (n != null && n != undefined)
                return r(n)
        }
    }) : $.ajax({
        type: "POST",
        url: global_getBaseUrl() + "/api/lookup/locationtimes/" + n,
        cache: !1,
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify({
            RequestDate: t
        }),
        dataType: "json",
        success: function(n) {
            i(n)
        },
        error: function(n) {
            if (n != null && n != undefined)
                return r(n)
        }
    })
}
function getTimesFull(n, t, i) {
    $.ajax({
        type: "POST",
        url: global_getBaseUrl() + "/api/lookup/locationtimesfull/" + n + "/current",
        cache: !1,
        contentType: "application/json; charset-utf-8",
        dataType: "json",
        success: function(n) {
            t(n)
        },
        error: function(n) {
            if (n != null && n != undefined)
                return i(n)
        }
    })
}
function getMedia(n, t, i, r, u, f, e, o) {
    $.ajax({
        type: "GET",
        url: global_getBaseUrl() + "/api/media/bytime/" + n + "/" + t + "/" + i + "/" + r + "/" + u + "/" + f,
        cache: !1,
        contentType: "application/json; charset-utf-8",
        success: function(n) {
            e(n)
        },
        error: function(n) {
            if (n != null && n != undefined)
                return o(n)
        }
    })
}
function getMediaPath(n, t) {
    if (n == null || n == "" || n == "00000000-0000-0000-0000-000000000000")
        throw "Invalid mediaGuid sent.";
    return t !== undefined && t !== null && t.trim() !== "" ? global_getBaseUrl() + "/api/media/file/" + n + "?email=" + t.trim() : global_getBaseUrl() + "/api/media/file/" + n
}
function getThumbMediaPath(n, t) {
    if (n == null || n == "" || n == "00000000-0000-0000-0000-000000000000")
        throw "Invalid mediaGuid sent.";
    return t !== undefined && t !== null && t.trim() !== "" ? global_getBaseUrl() + "/api/media/file/" + n + "/thumb?email=" + t.trim() : global_getBaseUrl() + "/api/media/file/" + n + "/thumb"
}
function addToMediaAssociationQueue(n, t, i, r, u, f, e) {
    $.ajax({
        type: "POST",
        url: global_getBaseUrl() + "/api/media/addassociationqueue",
        cache: !1,
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify({
            MediaGuids: n,
            AssociationType: t,
            AssociationValue: i,
            HasMedia: u
        }),
        dataType: "json",
        success: function(n) {
            f(n)
        },
        error: function(n) {
            if (n != null && n != undefined)
                return e(n)
        }
    })
}
function getId(n, t) {
    $.ajax({
        type: "GET",
        url: global_getBaseUrl() + "/api/user/id",
        cache: !1,
        contentType: "application/json; charset-utf-8",
        data: null,
        dataType: "json",
        success: function(t) {
            n(t)
        },
        error: function(n) {
            if (n != null && n != undefined)
                return t(n)
        }
    })
}
function checkGeoAccess(n, t, i, r, u) {
    $.ajax({
        type: "GET",
        url: global_getBaseUrl() + "/api/fence/hasaccess/" + n + "/" + t + "/" + i,
        cache: !1,
        contentType: "application/json; charset-utf-8",
        dataType: "json",
        success: function(n) {
            r({ "readyState": 4, "responseText": "{\"success\":true,\"message\":\"Success\"}", "responseJSON": { "success": true, "message": "Success" }, "status": 200, "statusText": "success" })
        },
        error: function(n) {
            if (n != null && n != undefined)
                return u(true)
        }
    })
}
function formatNumberItem(n, t) {
    return n == 0 && t && (n = 12),
    n > 9 ? "" + n : "0" + n
}
function scrollIntoView(n, t) {
    $(n).length > 0 && $(n)[0].scrollIntoView(t)
}
function startOver() {
    window.location.href = global_getBaseUrl() !== "" ? global_getBaseUrl() : "/"
}
function getCatalogIdByMedia(n, t) {
    var i = global_getBaseUrl() + "/api/media/" + n + "/catalogid";
    return t && (i = i + "?onlyshippable=true"),
    new Promise(function(n) {
        $("#_useOrderSystem").val() != "true" ? n({
            success: !1
        }) : $.ajax({
            type: "GET",
            url: i,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(t) {
                n(t)
            },
            error: function() {
                n({
                    success: !1
                })
            }
        })
    }
    )
}
function getLocationCatalogItems(n, t) {
    var i = global_getBaseUrl() + "/api/catalog/" + n + "/items";
    return t && (i = i + "?onlyshippable=true"),
    new Promise(function(n, t) {
        $("#_useOrderSystem").val() != "true" ? n({
            success: !1
        }) : $.ajax({
            type: "GET",
            url: i,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(t) {
                n(t)
            },
            error: function(n) {
                n != null && n != undefined && t(n)
            }
        })
    }
    )
}
function getCart(n, t) {
    return new Promise(function(i, r) {
        if (n == null)
            return r("No deviceID sent");
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/carts/?associationValue=" + n + "&cleanParkPickup=" + t,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                i(n)
            },
            error: function(n) {
                n != null && n != undefined && r(n)
            }
        })
    }
    )
}
function getCartByCartId(n) {
    return new Promise(function(t, i) {
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/carts/" + n,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                t(n)
            },
            error: function(n) {
                n != null && n != undefined && i(n)
            }
        })
    }
    )
}
function createCart(n) {
    return new Promise(function(t, i) {
        $.ajax({
            type: "POST",
            url: global_getBaseUrl() + "/api/carts",
            cache: !1,
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify({
                AssociationValue: n
            }),
            dataType: "json",
            success: function(n) {
                t(n)
            },
            error: function(n) {
                n != null && n != undefined && i(n)
            }
        })
    }
    )
}
function deleteCart(n) {
    return new Promise(function(t, i) {
        $.ajax({
            type: "DELETE",
            url: global_getBaseUrl() + "/api/carts/" + n,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                t(n)
            },
            error: function(n) {
                n != null && n != undefined && i(n)
            }
        })
    }
    )
}
function deleteNonShippable(n) {
    return new Promise(function(t, i) {
        $.ajax({
            type: "DELETE",
            url: global_getBaseUrl() + "/api/carts/" + n + "/nonshippable",
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                t(n)
            },
            error: function(n) {
                n != null && n != undefined && i(n)
            }
        })
    }
    )
}
function addToCart(n, t, i, r, u) {
    return new Promise(function(f, e) {
        $.ajax({
            type: "POST",
            url: global_getBaseUrl() + "/api/carts/" + n + "/items",
            cache: !1,
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify({
                CatalogItemId: t,
                Quantity: i,
                Metadata: r,
                "Mediadata:": u
            }),
            dataType: "json",
            success: function(n) {
                f(n)
            },
            error: function(n) {
                n != null && n != undefined && e(n)
            }
        })
    }
    )
}
function updateCartQuantity(n, t, i, r) {
    return i <= 0 ? deleteCartItem(n, t) : new Promise(function(u, f) {
        $.ajax({
            type: "PUT",
            url: global_getBaseUrl() + "/api/carts/" + n + "/items/" + t,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify({
                Quantity: i,
                Metadata: r
            }),
            dataType: "json",
            success: function(n) {
                u(n)
            },
            error: function(n) {
                n != null && n != undefined && f(n)
            }
        })
    }
    )
}
function deleteCartItem(n, t) {
    return new Promise(function(i, r) {
        $.ajax({
            type: "DELETE",
            url: global_getBaseUrl() + "/api/carts/" + n + "/items/" + t,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            dataType: "json",
            success: function(n) {
                i(n)
            },
            error: function(n) {
                n != null && n != undefined && r(n)
            }
        })
    }
    )
}
function getCatalogItem(n) {
    return new Promise(function(t, i) {
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/catalog/items/" + n,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                t(n)
            },
            error: function(n) {
                n != null && n != undefined && i(n)
            }
        })
    }
    )
}
function calculateSubtotal(n) {
    return new Promise(function(t, i) {
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/checkout/calc/subtotal?cartid=" + n,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                t(n)
            },
            error: function(n) {
                n != null && n != undefined && i(n)
            }
        })
    }
    )
}
function calculateTax(n, t, i, r) {
    return new Promise(function(u, f) {
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/checkout/calc/tax?stateid=" + t + "&countryId=" + n + "&zipCode=" + i + "&subtotal=" + r,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                u(n)
            },
            error: function(n) {
                n != null && n != undefined && f(n)
            }
        })
    }
    )
}
function generateInvoice(n, t, i, r, u, f, e, o, s) {
    return new Promise(function(h, c) {
        $.ajax({
            type: "POST",
            url: global_getBaseUrl() + "/api/checkout/invoice",
            cache: !1,
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify({
                CartId: n,
                Email: t.trim(),
                UserId: i,
                StateId: r,
                CountryId: u,
                ZipCode: f,
                Subtotal: e,
                Tax: o,
                Shipping: s
            }),
            dataType: "json",
            success: function(n) {
                h(n)
            },
            error: function(n) {
                n != null && n != undefined && c(n)
            }
        })
    }
    )
}
function submitCredit(n, t, i) {
    return new Promise(function(r, u) {
        $.ajax({
            type: "POST",
            url: global_getBaseUrl() + "/api/checkout/payment/credit",
            cache: !1,
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify({
                InvoiceId: n,
                CartId: t,
                CreditCardInfo: {
                    Number: i.number,
                    Expiration: i.expiration,
                    CVV: i.cVV,
                    FirstName: i.firstName,
                    LastName: i.lastName,
                    PostalCode: i.postalCode
                }
            }),
            dataType: "json",
            success: function(n) {
                r(n)
            },
            error: function(n) {
                n != null && n != undefined && u(n)
            }
        })
    }
    )
}
function submitToken(n, t, i) {
    return new Promise(function(r, u) {
        $.ajax({
            type: "POST",
            url: global_getBaseUrl() + "/api/checkout/payment/nmitoken/" + n + "/" + t + "",
            cache: !1,
            data: i,
            dataType: "json",
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                r(n)
            },
            error: function(n) {
                n != null && n != undefined && u(n)
            }
        })
    }
    )
}
function getInvoiceStatus(n, t) {
    return new Promise(function(i, r) {
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/invoices/" + n + "/status?&filter=" + t,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                i(n)
            },
            error: function(n) {
                n != null && n != undefined && r(n)
            }
        })
    }
    )
}
function EmailHasDigitalAccess(n, t) {
    return new Promise(function(i, r) {
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/user/active?email=" + n.trim() + "&checkDate=" + t,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                i(n)
            },
            error: function(n) {
                n != null && n != undefined && r(n)
            }
        })
    }
    )
}
function BarcodeHasDigitalAccess(n, t) {
    return new Promise(function(i, r) {
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/user/active?deviceId=" + n.trim() + "&checkDate=" + t,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                i(n)
            },
            error: function(n) {
                n != null && n != undefined && r(n)
            }
        })
    }
    )
}
function EmailOrBarcodeHasDigitalAccess(n, t, i) {
    return new Promise(function(r, u) {
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/user/active?deviceId=" + t.trim() + "&email=" + n.trim() + "&checkDate=" + i,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                r(n)
            },
            error: function(n) {
                n != null && n != undefined && u(n)
            }
        })
    }
    )
}
function CreateUser(n, t, i) {
    return new Promise(function(r, u) {
        if (localStorage.getItem("_createUserTime") !== null) {
            var f = new Date(localStorage.getItem("_createUserTime"));
            new Date >= new Date(f) ? localStorage.removeItem("_createUserTime") : u("Please wait to change your email again.")
        }
        $.ajax({
            type: "POST",
            url: global_getBaseUrl() + "/api/user",
            cache: !1,
            data: JSON.stringify({
                UserId: n,
                Barcode: i,
                Email: t.trim()
            }),
            dataType: "json",
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                r(n)
            },
            error: function(n) {
                n != null && n != undefined && u(n)
            }
        })
    }
    )
}
function GetProduct(n) {
    return new Promise(function(t, i) {
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/product/" + n,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                t(n)
            },
            error: function(n) {
                n != null && n != undefined && i(n)
            }
        })
    }
    )
}
function CartIsDigital(n) {
    return new Promise(function(t) {
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/carts/" + n + "/alldigital",
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                t(n.success)
            },
            error: function() {
                t(!1)
            }
        })
    }
    )
}
function mediaHasDigitalRights(n, t, i, r) {
    return new Promise(function(u) {
        if (r)
            return u(!0);
        if (n === null || n === "")
            return u(!1);
        url = "";
        url = t === null || t === "" ? "/api/media/" + n + "/digitalrights?barcode=" + i.trim() : "/api/media/" + n + "/digitalrights?email=" + t.trim() + "&barcode=" + i.trim();
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + url,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                u(n.success)
            },
            error: function(n) {
                if (n != null && n != undefined)
                    return u(!1)
            }
        })
    }
    )
}
function submitAlbumDebug() {
    var t = localStorage.getItem("albumMedia")
      , n = localStorage.getItem("userEmail");
    t !== null && (n === null && (n = "Unknown"),
    $.ajax({
        type: "POST",
        url: global_getBaseUrl() + "/api/debug/log/album",
        cache: !1,
        data: JSON.stringify({
            Email: n,
            AlbumJSON: t
        }),
        dataType: "json",
        contentType: "application/json; charset-utf-8",
        success: function(n) {
            success(n)
        },
        error: function(n) {
            n != null && n != undefined && failure(n)
        }
    }))
}
function getCatalogPageHref(n, t) {
    return n + "/product/" + t
}
function getNMIPaymentTokenEndpoint(n, t, i) {
    return n + "/api/checkout/payment/nmitoken/" + t + "/" + i
}
function applyDiscountCode(n, t) {
    return new Promise(function(i, r) {
        if (n === null || t === null || t === "")
            return i(!1);
        $.ajax({
            type: "PUT",
            url: global_getBaseUrl() + "/api/discountcode",
            cache: !1,
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify({
                cartId: n,
                discountCode: t,
                uTCOffset: (new Date).getTimezoneOffset() / 60
            }),
            dataType: "json",
            success: function(n) {
                i(n.success)
            },
            error: function() {
                return r(!1)
            }
        })
    }
    )
}
function removeDiscountCode(n) {
    return new Promise(function(t, i) {
        if (n === null)
            return t(!1);
        $.ajax({
            type: "DELETE",
            url: global_getBaseUrl() + "/api/discountcode?cartId=" + n,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                t(n.success)
            },
            error: function() {
                return i(!1)
            }
        })
    }
    )
}
function shared_validateEcommerceEmail(n) {
    return new Promise(function(t, i) {
        if (n === null)
            return t(!1);
        $.ajax({
            type: "GET",
            url: global_getBaseUrl() + "/api/user/exists?email=" + n,
            cache: !1,
            contentType: "application/json; charset-utf-8",
            success: function(n) {
                t(n.success)
            },
            error: function() {
                return i(!1)
            }
        })
    }
    )
}
function getGeoLocation(n, t) {
    var i = null;
    i = n ? {
        maximumAge: 1,
        timeout: 1e4
    } : {
        maximumAge: 6e5,
        timeout: 1e4
    };
    navigator.geolocation.getCurrentPosition(function(n) {
        sessionStorage.setItem("currentGeoPosition", JSON.stringify(n));
        checkGeoAccess($("#siteId").val(), n.coords.latitude, n.coords.longitude, function(n) {
            t(n.success);
            return
        }, function() {
            t(!1);
            return
        })
    }, function(n) {
        console.log("Error occured while getting geolocation. Error code: " + n.code);
        t(!1)
    }, i)
}
function requireGeoLocation() {
    return "false"
}
function templateDrawAlbumItem(n, t, i, r, u, f, e, o) {
    var c, h, l;
    const v = document.querySelector("#template-spinner")
      , y = v.content.cloneNode(!0)
      , p = document.querySelector("#template-album-photo-item")
      , s = p.content.cloneNode(!0)
      , a = `${t}-mediacontainer`;
    s.querySelector("#temp-mediaguid-mediacontainer").setAttribute("id", a);
    s.querySelector("#temp-container-order").setAttribute("id", `container-${e}`);
    s.querySelector("#temp-spinner-template").innerHTML = (new XMLSerializer).serializeToString(y);
    c = s.querySelector("#temp-mediaitem-img");
    c.setAttribute("src", i);
    c.setAttribute("alt", e);
    c.removeAttribute("id");
    c.addEventListener("load", function() {
        $(`#${a}`).parentsUntil(".card").find(".loadWrapper").remove();
        $(`#${a}`).parentsUntil(".card").find(".gallery-placeholder").remove();
        $(`#${a}`).parentsUntil(".card").find(".placeholder-height").removeClass("placeholder-height")
    });
    h = s.querySelector("#temp-download-button-mediaguid");
    h.setAttribute("id", `download-button-${t}`);
    l = s.querySelector("#temp-purchase-media-mediaguid");
    $.when(promiseDownloadButton(t, n, localStorage.getItem("id"), u), promisePurchaseButton(t, f)).done(function(n, i) {
        n && (h.removeAttribute("disabled"),
        h.classList.remove("disabled"),
        h.classList.remove("d-none"),
        h.setAttribute("href", r));
        i.success && (l.setAttribute("onclick", `callProduct("${t}")`),
        l.classList.remove("disabled"),
        l.classList.remove("d-none"),
        l.removeAttribute("disabled"))
    });
    o.append(s)
}
function promiseDownloadButton(n, t, i, r) {
    return r ? new Promise(function(n) {
        return n(!0)
    }
    ) : mediaHasDigitalRights(n, t, i, r)
}
function promisePurchaseButton(n, t) {
    return t ? getCatalogIdByMedia(n) : new Promise(function(n) {
        return n(!1)
    }
    )
}
function templateDrawSearchImage(n, t, i, r) {
    var o, e;
    const s = document.querySelector("#template-spinner")
      , h = s.content.cloneNode(!0)
      , c = document.querySelector("#template-search-photo-item")
      , u = c.content.cloneNode(!0)
      , f = `${n}-container`;
    o = u.querySelector("#temp-mediaguid-mediacontainer");
    o.setAttribute("onclick", `addSingle('${n}')`);
    o.setAttribute("id", f);
    u.querySelector("#temp-spinner-template").innerHTML = (new XMLSerializer).serializeToString(h);
    u.querySelector("#temp-additem-button").setAttribute("onclick", `addSingle('${n}')`);
    e = u.querySelector("#temp-mediaitem-img");
    e.setAttribute("src", t);
    e.setAttribute("id", n);
    e.addEventListener("load", function() {
        $(`#${f}`).parentsUntil(".card").find(".loadWrapper").remove();
        $(`#${f}`).parentsUntil(".card").find(".gallery-placeholder").remove();
        $(`#${f}`).parentsUntil(".card").find(".placeholder-height").removeClass("placeholder-height")
    });
    r ? i.append(u) : i.prepend(u)
}
let NAME_LOCAL_GLOBAL_USERID = "id"
  , NAME_LOCAL_GLOBAL_CART = "current_cart"
  , NAME_LOCAL_GLOBAL_EMAIL = "userEmail"
  , NAME_LOCAL_GLOBAL_ALBUM = "albumMedia"
  , NAME_VARIABLE_BASEURL = "#_base_url"
  , NAME_VARIABLE_ECOMMERCE_URL = "#_ec_url";
$(document).ready(function() {
    sessionStorage.getItem("entry_url") === null && sessionStorage.setItem("entry_url", document.URL)
});
let defCreditCardInfo = {
    number: "",
    expiration: "",
    cVV: "",
    firstName: "",
    lastName: "",
    postalCode: ""
}
